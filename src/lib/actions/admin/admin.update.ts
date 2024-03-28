"use server"

import prisma from "@/lib/configs/prisma";

export const updateEveryAdminSettings = async (
  formData: FormData,
  id: string,
) => {

const data = formData.getAll as any

  try {

    const response = await prisma.admin.update({
      where: {
        id,
      },
      data
    });

    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};
