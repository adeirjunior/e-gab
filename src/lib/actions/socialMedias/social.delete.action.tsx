"use server";

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { hasSubscription } from "@/lib/helpers/billing";
import { SocialMediaTypes } from "@prisma/client";

export const deleteSocial = async (type: SocialMediaTypes) => {
  const hasSub = await hasSubscription();

  if (!hasSub) {
    return {
      error: `Você precisa assinar um plano para realizar este comando.`,
    };
  }

  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const response = await prisma.socialMedia.delete({
    where: {
      type,
    },
  });

  return response;
};
