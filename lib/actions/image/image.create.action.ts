"use server";

import { getSession } from "@/lib/auth/get-session";
import cloudinary from "@/lib/configs/cloudinary";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { SearchResult } from "@/lib/types/types";
import { revalidatePath } from "next/cache";

export async function create(formData: FormData) {
  const session = await getSession()

  if(!session) {
    throw new Error("Erro")
  }

  const website =await  getWebsiteByUserId(session.user.id)

   if (!website) {
     throw new Error("Erro");
   }

  
  const file = formData.get("image") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          tags: ["nextjs-server-actions-upload-sneakers"],
          folder: `E-Gab/Websites/Website ${website.id}`,
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
  revalidatePath("/arquivos");
}

export const createWebsiteFolder = async (id: string) => {
  await cloudinary.v2.api.create_folder(`E-Gab/Websites/Website ${id}`);
};

export async function setAsFavoriteAction(
  publicId: string,
  isFavorite: boolean,
) {
  if (isFavorite) {
    await cloudinary.v2.uploader.add_tag("favorite", [publicId]);
  } else {
    await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
  }
}

export async function addImageToAlbum(image: SearchResult, album: string) {
  await cloudinary.v2.api.create_folder(album);

  let parts = image.public_id.split("/");
  if (parts.length > 1) {
    parts = parts.slice(1);
  }
  const publicId = parts.join("/");

  await cloudinary.v2.uploader.rename(image.public_id, `${album}/${publicId}`);
}
