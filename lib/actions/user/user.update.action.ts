"use server";

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { create, userLogoImagePathCreator } from "../image/image.create.action";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const editUser = async (
  formData: FormData,
  _id: unknown,
  key: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const value = formData.get(key) as string;

  try {
    let response: User;
    if (key === "image" || key === "logo") {
      if (
        !process.env.CLOUDINARY_UPLOAD_PRESET ||
        !process.env.CLOUDINARY_API_SECRET ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      ) {
        return {
          error: "Variáveis de ambiente da Cloudinary não foram encontradas.",
        };
      }

      const url = await create(formData, userLogoImagePathCreator, key, ['user', 'logo']);

      response = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          image: url,
        },
      });
    } else {
      response = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          [key]: value,
        },
      });
    }
    revalidatePath("/configuracoes");
    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This ${key} is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};
