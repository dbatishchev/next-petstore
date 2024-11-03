'use client'

import { useState } from 'react'
import { createOrder } from '../actions/purchase'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

export function BuyButton({ petId, isPending }: { petId: number, isPending: boolean }) {
  const { data: session } = useSession()
  const [isAdding, setIsAdding] = useState(false)

  const handleClick = async () => {
    if (!session?.user?.email) {
      toast.error('You must be signed in to buy a pet')
      return
    }
    setIsAdding(true)
    await createOrder(petId)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending || isAdding}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {isPending || isAdding ? 'Added to Cart' : 'Buy Now'}
    </button>
  )
}
