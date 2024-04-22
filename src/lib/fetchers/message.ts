"use server"
import prisma from "../configs/prisma";

export async function getAllMessagesFromRoomId(chatRoomId: string) {
  return await prisma.message.findMany({
    where: {
      chatRoomId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}