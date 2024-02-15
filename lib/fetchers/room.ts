"use server"

import { ChatRoomStatus } from "@prisma/client";
import prisma from "../configs/prisma";

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

export async function countRoomsWithStatus(websiteId: string, status: ChatRoomStatus) {
    try {
      const rooms = await prisma.chatRoom.count({
    where: {
      status,
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


export async function getRoomsWithLimit(websiteId: string, take: number) {
  try {
    const rooms = await prisma.chatRoom.findMany({
    where: {
      websiteId,
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

