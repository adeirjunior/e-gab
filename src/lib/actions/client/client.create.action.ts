"use server";

import prisma from "@/lib/configs/prisma";
import { Client } from "@prisma/client";

export const createClient = async (id: string) => {
  try {
    const response: Client = await prisma.client.create({
      data: {
        user: {
          connect: {
            id,
          },
        },
      },
    });

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: "client",
      },
    });

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
