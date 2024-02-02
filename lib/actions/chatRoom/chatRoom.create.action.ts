import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";

export const createChatRoom = async (clientId: string, websiteId: string) => {
  const session = await getSession();

  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  

   const response = await prisma.chatRoom.create({
    data: {
      clientId,
      websiteId
    },
  });

  return response;
}