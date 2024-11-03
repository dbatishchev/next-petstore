'use client'

import { confirmOrder } from '@/app/actions/purchase'

export function CheckoutForm({ petId }: { petId: number }) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await confirmOrder(petId)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">
          Confirm that you want to adopt this pet
        </label>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Confirm Order
      </button>
    </form>
  )
} 