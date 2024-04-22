"use server";

import prisma from "@/lib/configs/prisma";
import { revalidatePath } from "next/cache";
import { websiteImagePathCreatorWithSubdomain } from "@/lib/utils/cloudinary-path-creators";
import { create } from "../image/image.create.action";

export const createChatRoom = async (
  clientId: string,
  websiteId: string,
  formData: FormData,
) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const tel = formData.get("tel") as string;
  const image = formData.get("image") as File;

  if (!clientId || !websiteId || !title || !description || !address || !tel) {
    return {
      error: "One or more required fields are empty",
    };
  }

  let path: string | undefined = "";

  if (image.size >= 1) {
    path = await create(
      formData,
      websiteImagePathCreatorWithSubdomain,
      "image",
      ["chat", "image"],
    );

    if (!path) {
      return {
        error: "Falha ao coletar url",
      };
    }
  }

  const response = await prisma.chatRoom.create({
    data: {
      clientId,
      websiteId,
      title,
      description,
      address,
      tel,
      startingFiles: path ? [path] : [],
    },
  });

  if (!response) {
    return {
      error: "Não foi possível criar a sala.",
    };
  }

  revalidatePath("/ouvidoria");
  return response;
};

export const createOrUpdateAcceptedRequest = async (
  chatRoomId: string,
  formData: FormData,
) => {
  const from = formData.get("from") as unknown as Date;
  const to = formData.get("to") as unknown as Date;

  if (!from) {
    return {
      error: "Data de entrega esta vazia.",
    };
  }

  const createData = { from, chatRoomId };

  const updateData = { from};

  const response = await prisma.acceptedChatRoomRequest.upsert({
    create: createData,
    update: updateData,
    where: {
      chatRoomId,
    },
  });

  await prisma.chatRoom.update({
    where: {
      id: chatRoomId,
    },
    data: {
      status: "accepted",
    },
  });

  if (!response) {
    return {
      error: "Falha ao criar sala aceita.",
    };
  }

  return response;
};
