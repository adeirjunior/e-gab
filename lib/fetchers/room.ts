"use server"

import { unstable_cache } from "next/cache";

export async function getRooms(websiteId: string) {
  if (!websiteId) {
    // Trate o caso em que websiteId é undefined
    console.error("O parâmetro 'websiteId' não pode ser undefined.");
    return null; // ou lançar uma exceção, dependendo do seu caso
  }

  return await unstable_cache(
    async () => {
      return await prisma.chatRoom.findMany({
        where: {
          websiteId,
        },
      });
    },
    [`${websiteId}-metadata`],
    {
      revalidate: 900,
      tags: [`${websiteId}-metadata`],
    },
  )();
}
