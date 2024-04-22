"use server";

import { withSiteAuth } from "@/lib/auth";
import { Website } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { getSession } from "@/lib/auth/get-session";
import { hasSubscription } from "@/lib/helpers/billing";

export const createEvent = withSiteAuth(async (_: FormData, site: Website) => {
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


  const response = await prisma.event.create({
    data: {
      websiteId: site.id,
    },
  });

  revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
  );
  site.customDomain && revalidateTag(`${site.customDomain}-posts`);

  return response;
});
