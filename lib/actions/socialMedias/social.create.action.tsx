"use server";

import { SocialMediaTypes } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { getSession } from "@/lib/auth/get-session";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { hasSubscription } from "@/lib/helpers/billing";

export const createSocial = async (social: FormData) => {

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

  const site = await getWebsiteByUserId(session.user.id)

  if (!site) {
    return {
      error: "Erro ao encontrar site.",
    };
  }

  const type = social.get("socialMedia") as SocialMediaTypes;
  const handle = social.get("socialMediaName") as string;

  if (!type || !handle) {
    return {
      error: "Erro em encontrar conteúdo.",
    };
  }

  const response = await prisma.socialMedia.create({
    data: {
      website: {
        connect: {
          id: site.id
        }
      },
      handle,
      type,
    },
  });

  revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-socials`,
  );
  site.customDomain && revalidateTag(`${site.customDomain}-socials`);

  return response;
}
