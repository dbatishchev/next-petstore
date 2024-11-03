'use client'

import { Button } from "@/components/ui/button"
import { PawPrint } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"
import { purchasePet } from "../actions/purchase"

export default function BuyButton({ petId }: { petId: number }) {
  const [isPending, startTransition] = useTransition()

  const handlePurchase = () => {
    startTransition(async () => {
      const result = await purchasePet(petId)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <Button 
      className="w-full" 
      onClick={handlePurchase}
      disabled={isPending}
    >
      <PawPrint className="mr-2 h-4 w-4" /> 
      {isPending ? 'Processing...' : 'Buy Now'}
    </Button>
  )
}
