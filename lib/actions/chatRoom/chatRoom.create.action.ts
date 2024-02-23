"use server";

import prisma from "@/lib/configs/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/get-session";
import cloudinary from "@/lib/configs/cloudinary";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { create, websiteImagePathCreator } from "../image/image.create.action";

export const createChatRoom = async (
  clientId: string,
  websiteId: string,
  formData: FormData,
) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const tel = formData.get("tel") as string;
  const images = ["image-upload", "image2-upload"];

  if (!clientId || !websiteId || !title || !description || !address || !tel) {
    return {
      error: "One or more required fields are empty",
    };
  }

  const startingFiles: string[] = [];

  images.map(async (image) => {
    console.log(JSON.stringify(image));
    if (image) {

      const path = await create(formData, websiteImagePathCreator, image, ["chat", "image"]);

      startingFiles.push(path);
    }
  });

  const response = await prisma.chatRoom.create({
    data: {
      clientId,
      websiteId,
      title,
      description,
      address,
      tel,
      startingFiles,
    },
  });

  revalidatePath("/ouvidoria");
  return response;
};