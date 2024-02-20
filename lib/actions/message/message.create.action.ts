"use server"

import prisma from "@/lib/configs/prisma";
import { revalidatePath } from "next/cache";

export const createMessage = async (text: string, userId: string, chatRoomId: string) => {

  const response = await prisma.message.create({
    data: {
        text,
        chatRoomId: chatRoomId as string,
        userId,
        
  }});

  revalidatePath(`/ouvidoria/${chatRoomId}`)
  return response;
};
