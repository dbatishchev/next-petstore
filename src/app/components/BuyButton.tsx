'use client'

import { useState } from 'react'
import { createOrder } from '../actions/purchase'

export function BuyButton({ petId, isPending }: { petId: number, isPending: boolean }) {
  const [isAdding, setIsAdding] = useState(false)

  const handleClick = async () => {
    setIsAdding(true)
    await createOrder(petId)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isAdding || isPending}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {isPending || isAdding ? 'Added to Cart' : 'Buy Now'}
    </button>
  )
}
