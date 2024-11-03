import { prisma } from '@/lib/prisma'

export async function createOrderMutation(petId: number, userId: string) {
  return prisma.order.create({
    data: {
      petId,
      status: 'PENDING',
      userId,
    },
  })
} 