"use server";

import { getSession } from "@/lib/auth/get-session";
import { hasSubscription } from "@/lib/helpers/billing";
import { SocialMediaTypes } from "@prisma/client";
import prisma from "@/lib/configs/prisma";

export const updateSocial = async (social: FormData) => {
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

  const type = social.get("type") as SocialMediaTypes;
  const handle = social.get("socialMediaUsername") as string;

  if (!type) {
    return {
      error: "Erro em encontrar conteúdo.",
    };
  }

  const response = await prisma.socialMedia.update({
    where: {
      type,
    },
    data: {
      handle
    },
  });

  return response;
};
