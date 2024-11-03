import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BuyButton } from "./BuyButton"
import { getAvailablePets } from "../queries/getPets"
import { getServerSession } from "next-auth"

export default async function PetList() {
  const session = await getServerSession()
  const pets = await getAvailablePets(session?.user?.email ?? undefined)

  console.log("!!!!")
  console.log(session?.user?.email)

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
              <BuyButton 
                petId={pet.id} 
                isPending={pet.order?.status === 'PENDING'}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}