"use server"

import prisma from "@/lib/configs/prisma";
import { revalidatePath } from "next/cache";

export const createChatRoom = async (
  clientId: string,
  websiteId: string,
  formData: FormData
) => {

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
const tel = formData.get("tel") as string;



  if (
    !clientId ||
    !websiteId ||
    !title ||
    !description ||
    !address || !tel
  ) {
    return {
      error: "One or more required fields are empty",
    };
  }

  const response = await prisma.chatRoom.create({
    data: {
      clientId,
      websiteId,
      title,
      description,
      address,
      tel
    },
  });

  revalidatePath("/ouvidoria")
  return response;
};
