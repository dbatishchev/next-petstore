import { CheckoutForm } from '@/app/components/CheckoutForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function CheckoutPage({
  params: { petId },
}: {
  params: { petId: number }
}) {
  const order = await prisma.order.findUnique({
    where: { petId: Number(petId) },
    include: { pet: true },
  })

  if (!order || order.status !== 'PENDING') {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="mb-4">
        <h2 className="text-xl mb-2">{order.pet.name}</h2>
        <img
          src={order.pet.imageUrl}
          alt={order.pet.name}
          className="w-full max-w-md rounded-lg"
        />
      </div>
      <CheckoutForm petId={Number(petId)} />
    </div>
  )
} 