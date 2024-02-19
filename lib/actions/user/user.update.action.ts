"use server";

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { create } from "../image/image.create.action";
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
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return {
          error:
            "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
        };
      }

      const url  = await create(formData, 'logo');

      response = await prisma.user.update({
        where: {
          id: session.user.id
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
