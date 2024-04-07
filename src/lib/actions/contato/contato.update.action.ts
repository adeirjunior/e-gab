"use server";

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { hasSubscription } from "@/lib/helpers/billing";

export const updateContact = async (
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

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    const hasSub = await hasSubscription();

    if (user?.role === "politician" && !hasSub) {
      return {
        error: `Você precisa assinar um plano para realizar este comando.`,
      };
    }


  const value = formData.get(key) as string;

  try {
    const site = await getWebsiteByUserId(session.user.id);

    const response = await prisma.contact.upsert({
      create: {
[key]: value,
      },
      where: {
        id: site?.contactId ?? undefined,
      },
      update: {
        [key]: value,
      }
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
