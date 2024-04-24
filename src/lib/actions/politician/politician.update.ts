"use server"

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";

export const editOneKeyPolitician = async (value: any, key: string) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const politician = await prisma.politician.update({
      where: {
        userId: session.user.id,
      },
      data: {
        [key]: value,
      },
    });
  } catch (error) {}
};
