import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";

export const createMessage = async (text: string, userId: string, chatRoomId: string) => {
  const session = await getSession();

  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const response = await prisma.message.create({
    data: {
        text,
        chatRoomId,
        userId

    },
  });

  return response;
};
