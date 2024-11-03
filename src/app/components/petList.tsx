import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Pet } from "@prisma/client"

async function getPets(): Promise<Pet[]> {
  return await prisma.pet.findMany({
    orderBy: {
      id: 'asc'
    }
  });
}

export default async function PetList() {
  const pets = await getPets();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Pets for Sale</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <Card key={pet.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{pet.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <img
                src={pet.imageUrl}
                alt={`${pet.name} the ${pet.breed}`}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-muted-foreground mb-2">{pet.breed}</p>
              <p className="text-muted-foreground mb-2">Age: {pet.age}</p>
              <p className="font-semibold text-lg">${pet.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <PawPrint className="mr-2 h-4 w-4" /> Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}