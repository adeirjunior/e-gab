"use server";

import { withSiteAuth } from "@/lib/auth";
import { Website } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { getSession } from "@/lib/auth/get-session";

export const createLegislativeIndication = withSiteAuth(
  async (_: FormData, site: Website) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    const response = await prisma.legislativeIndication.create({
      data: {
        userId: session.user.id,
        websiteId: site.id,
      },
    });

    revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    site.customDomain && revalidateTag(`${site.customDomain}-posts`);

    return response;
  },
);
