'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export async function createOrder(petId: number) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    throw new Error('You must be logged in to purchase a pet')
  }

  const order = await prisma.order.create({
    data: {
      petId,
      status: 'PENDING',
      userId: session.user.email,
    },
  })
  
  revalidatePath('/')
  redirect(`/checkout/${petId}`)
}

export async function confirmOrder(petId: number) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    throw new Error('You must be logged in to confirm an order')
  }

  await prisma.order.update({
    where: { 
      petId,
      userId: session.user.email
    },
    data: { status: 'COMPLETED' }
  })
  
  revalidatePath('/')
  redirect('/')
}
