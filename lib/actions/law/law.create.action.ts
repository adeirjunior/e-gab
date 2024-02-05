"use server";

import { withSiteAuth } from "@/lib/auth";
import { Website } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { getSession } from "@/lib/auth/get-session";
import { hasSubscription } from "@/lib/helpers/billing";

export const createLaw = withSiteAuth(async (_: FormData, site: Website) => {

  const hasSub = await hasSubscription();

  if (!hasSub) {
    return {
      error: `Você precisa assinar um plano para realizar este comando.`,
    };
  }

  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Não autentificado",
    };
  }

  const response = await prisma.law.create({
    data: {
      websiteId: site.id,
    },
  });

  revalidateTag(`${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-law`);
  site.customDomain && revalidateTag(`${site.customDomain}-law`);

  return response;
});
