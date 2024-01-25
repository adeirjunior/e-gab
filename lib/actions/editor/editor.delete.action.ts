"use server";

import prisma from "@/lib/configs/prisma";

export const deleteContent = async (id: string) => {
  try {
    const response = await prisma.outputData.delete({
      where: {
        id
      },
    });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}
