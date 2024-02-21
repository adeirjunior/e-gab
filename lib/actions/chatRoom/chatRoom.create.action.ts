"use server";

import prisma from "@/lib/configs/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/get-session";
import cloudinary from "@/lib/configs/cloudinary";
import { getWebsiteByUserId } from "@/lib/fetchers/site";

export const createChatRoom = async (
  clientId: string,
  websiteId: string,
  formData: FormData,
) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const tel = formData.get("tel") as string;
  const image = formData.get("image-upload") as File;
  const image2 = formData.get("image-upload") as File;
  const images = [image, image2];

  if (!clientId || !websiteId || !title || !description || !address || !tel) {
    return {
      error: "One or more required fields are empty",
    };
  }

  const startingFiles: string[] = [];

  images.map(async (image) => {
    console.log(JSON.stringify(image));
    if (image) {
      const filePath = await create(image);

      if (typeof filePath === "object" && "error" in filePath) {
        return {
          error: filePath.error,
        };
      }

      startingFiles.push(filePath);
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

export async function create(file: File) {
  const session = await getSession();

  if (!session) {
    throw new Error("Error");
  }

  try {
    let path: string;
    const filename = "profile_image";

    const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result instanceof ArrayBuffer) {
          resolve(event.target.result);
        } else {
          reject(new Error("Failed to read file as ArrayBuffer"));
        }
      };
      reader.readAsArrayBuffer(file);
    });

    const buffer = Buffer.from(arrayBuffer);

    const upload = async () =>
      await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream(
            {
              tags: ["nextjs-server-actions-upload-sneakers"],
              folder: path,
            },
            function (error: any, result: unknown) {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            },
          )
          .end(buffer);
      });

    const website = await getWebsiteByUserId(session.user.id);
    if (!website) {
      throw new Error("Website not found");
    }

    path = `E-Gab/Websites/Website ${website.id}`;
    await upload();
    revalidatePath("/arquivos");

    return `${path}/${filename}`;
  } catch (error) {
    return {
      error: error.message,
    };
  }
}
