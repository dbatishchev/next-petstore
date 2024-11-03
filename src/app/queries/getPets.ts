import "server-only";
import { prisma } from "@/lib/prisma";

export async function getAvailablePets() {
  return await prisma.pet.findMany({
    where: {
      order: null,
    },
    orderBy: {
      id: "asc",
    },
  });
} 