"use server"

export async function getRooms(websiteId: string) {
    try {
      const rooms = await prisma.chatRoom.findMany({
        where: {
          websiteId,
        },
      });
      if (!rooms) {
        console.log("Website não encontrado.");
        return null;
      }
      return rooms;
    } catch (error) {
      console.error("Erro ao buscar o site:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
}
