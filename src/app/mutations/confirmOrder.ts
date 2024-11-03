import { prisma } from '@/lib/prisma'

export async function confirmOrderMutation(petId: number, userId: string) {
  return prisma.order.update({
    where: { 
      petId,
      userId
    },
    data: { status: 'COMPLETED' }
  })
} 