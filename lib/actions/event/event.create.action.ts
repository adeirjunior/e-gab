"use server";

import { withSiteAuth } from "@/lib/auth";
import { Website } from "@prisma/client";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { getSession } from "@/lib/auth/get-session";

export const createEvent = withSiteAuth(async (_: FormData, site: Website) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
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
