"use server";

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { revalidatePath } from "next/cache";

export const updateOneKeyChatRoom = async (
  formData: FormData,
  id: string,
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
    const response = await prisma.chatRoom.update({
      where: { id },
      data: {
        [key]: value,
      },
    });

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

export const updateChatRoom = async (
  formData: FormData,
  id: string,
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
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

     if (!user) {
       return {
         error: "Falhar ao encontrar usuário.",
       };
     }

    const userRole = user.role;

    const userRoleContent =
      userRole === "Politician"
        ? await prisma.politician.findUnique({
            where: {
              userId: session.user.id,
            },
          })
        : await prisma.secretary.findUnique({
            where: {
              userId: session.user.id,
            },
          });

     if (!userRoleContent) {
       return {
         error: "Falhar em coletar papel do usuário",
       };
     }
     const response = await prisma.chatRoom.update({
       where: { id },
       data: {
         [key]: value,
         [userRole === "Politician" ? "politicianId" : "secretaryId"]:
           userRoleContent.id,
       },
     });

    revalidatePath("/ouvidoria");
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

