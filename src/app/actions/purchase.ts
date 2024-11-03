'use server'

import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function purchasePet(petId: number) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    throw new Error('You must be logged in to purchase a pet')
  }

  try {
    // Check if pet exists and is not already sold
    const pet = await prisma.pet.findUnique({
      where: { id: petId },
      include: { order: true }
    })

    if (!pet) {
      throw new Error('Pet not found')
    }

    if (pet.order) {
      throw new Error('Pet has already been sold')
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        petId: pet.id,
        userId: session.user.email,
        status: 'completed'
      }
    })

    // Revalidate the pets list page
    revalidatePath('/')

    return { 
      success: true, 
      message: 'Pet purchased successfully!',
      order 
    }
  } catch (error) {
    console.error('Purchase error:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to purchase pet' 
    }
  }
}
