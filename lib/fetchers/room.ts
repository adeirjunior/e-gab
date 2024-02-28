"use server";

import { ChatRoomStatus } from "@prisma/client";
import prisma from "../configs/prisma";

export async function getRooms(websiteId: string) {
  try {
    const rooms = await prisma.chatRoom.findMany({
      where: {
        websiteId,
      },
      include: {
        acceptedRequest: true,
        client: {
          include: {
            user: true,
          },
        },
        politician: {
          include: {
            user: true,
          },
        },
        secretary: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!rooms) {
      console.log("getRooms falhou.");
      return null;
    }

    return rooms;
  } catch (error) {
    console.error("Erro getRooms: ", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getRoomsByUser(websiteId: string, userId: string) {
  try {
    const rooms = await prisma.chatRoom.findMany({
      where: {
        websiteId,
        client: {
          user: {
            id: userId,
          },
        },
      },
      include: {
        acceptedRequest: true
      }
    });
    if (!rooms) {
      console.log("getRoomsByUser falhou.");
      return null;
    }
    return rooms;
  } catch (error) {
    console.error("Erro getRoomsByUser:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getRoomsWithStatus(
  websiteId: string,
  status: ChatRoomStatus,
) {
 try {
   const rooms = await prisma.chatRoom.findMany({
     where: {
       websiteId,
       status
     },
     include: {
       acceptedRequest: true,
       client: {
         include: {
           user: true,
         },
       },
       politician: {
         include: {
           user: true,
         },
       },
       secretary: {
         include: {
           user: true,
         },
       },
     },
   });

   if (!rooms) {
     console.log("getRooms falhou.");
     return null;
   }

   return rooms;
 } catch (error) {
   console.error("Erro getRooms: ", error);
   throw error;
 } finally {
   await prisma.$disconnect();
 }
}

export async function countRoomsWithStatus(
  websiteId: string,
  status: ChatRoomStatus,
) {
  try {
    const rooms = await prisma.chatRoom.count({
      where: {
        status,
        websiteId,
      },
    });
    if (!rooms) {
      console.log("Website não encontrado.");
      return 0;
    }
    return rooms;
  } catch (error) {
    console.error("Erro ao buscar o site:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getRoomsWithLimitAndStatus(
  websiteId: string,
  take: number,
  status: ChatRoomStatus,
) {
  try {
    const rooms = await prisma.chatRoom.findMany({
      where: {
        websiteId,
        status,
      },
      include: {
        client: {
          select: {
            user: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        },
      },
      take,
      orderBy: {
        createdAt: "asc",
      },
    });
    return rooms;
  } catch (error) {
    console.error("Erro ao buscar o site:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
