import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";

export const createChatRoom = async (
  clientId: string,
  websiteId: string,
  formData: FormData
) => {
  const session = await getSession();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const neighborhood = formData.get("neighborhood") as string;
  const cep = formData.get("cep") as string;

  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  if (
    !clientId ||
    !websiteId ||
    !title ||
    !description ||
    !address ||
    !neighborhood ||
    !cep
  ) {
    return {
      error: "One or more required fields are empty",
    };
  }

  const response = await prisma.chatRoom.create({
    data: {
      clientId,
      websiteId,
      title,
      description,
      address,
      neighborhood,
      cep,
    },
  });

  return response;
};
