import "server-only";
import { prisma } from "@/lib/prisma";

export async function getAvailablePets(userId?: string) {
  return await prisma.pet.findMany({
    where: {
      OR: [
        { order: null },
        ...(userId ? [{
          order: {
            status: "PENDING",
            userId: userId
          }
        }] : [])
      ]
    },
    orderBy: {
      id: "asc",
    },
    include: {
      order: true
    }
  });
} 