'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { createOrderMutation } from '../mutations/createOrder'
import { confirmOrderMutation } from '../mutations/confirmOrder'

export async function createOrder(petId: number) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    throw new Error('You must be logged in to purchase a pet')
  }

  await createOrderMutation(petId, session.user.email)
  
  revalidatePath('/')
  redirect(`/checkout/${petId}`)
}

export async function confirmOrder(petId: number) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    throw new Error('You must be logged in to confirm an order')
  }

  await confirmOrderMutation(petId, session.user.email)
  
  revalidatePath('/')
  redirect('/')
}
