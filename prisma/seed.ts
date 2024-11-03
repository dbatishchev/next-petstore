import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.pet.createMany({
    data: [
      { name: "Buddy", breed: "Golden Retriever", age: "2 years", price: 1200, imageUrl: "/placeholder.svg?height=200&width=200" },
      { name: "Luna", breed: "Siamese Cat", age: "1 year", price: 800, imageUrl: "/placeholder.svg?height=200&width=200" },
      { name: "Max", breed: "German Shepherd", age: "3 years", price: 1500, imageUrl: "/placeholder.svg?height=200&width=200" },
      { name: "Bella", breed: "French Bulldog", age: "6 months", price: 2000, imageUrl: "/placeholder.svg?height=200&width=200" },
      { name: "Charlie", breed: "Parrot", age: "4 years", price: 500, imageUrl: "/placeholder.svg?height=200&width=200" },
      { name: "Nemo", breed: "Clownfish", age: "1 year", price: 50, imageUrl: "/placeholder.svg?height=200&width=200" },
    ]
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
