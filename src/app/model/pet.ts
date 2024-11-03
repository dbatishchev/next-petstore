export interface Pet {
    id: number
    name: string
    breed: string
    age: string
    price: number
    imageUrl: string
    order?: {
      id: string
      userId: string
      status: string
      createdAt: Date
      updatedAt: Date
    }
  }