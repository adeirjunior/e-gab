"use server";

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { Politician } from "@prisma/client";

export const createPolitician = async () => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const response: Politician = await prisma.politician.create({
      data: {
        party: "Partido Genérico",
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
