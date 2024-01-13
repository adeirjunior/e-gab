"use server"

import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function create(formData: FormData) {
    const file = formData.get('image') as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({
        tags: ['nextjs-server-actions-upload-sneakers']
      }, function (error: any, result: any) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      })
      .end(buffer);
    });
    revalidatePath('/')
  }