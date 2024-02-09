"use server";

import { getSession } from "@/lib/auth/get-session";
import cloudinary from "@/lib/configs/cloudinary";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
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

export const deleteWebsiteFolder = async (id: string) => {
  await cloudinary.v2.api
    .delete_folder(`E-Gab/Websites/Website ${id}`)
}

export const deleteImage = async (websiteId: string, imageId: string) => {
  await cloudinary.v2.api
    .delete_resources(
      [`E-Gab/Websites/Website ${websiteId}/${imageId}`],
      { type: "upload", resource_type: "image" },
    )
}