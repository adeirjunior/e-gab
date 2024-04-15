"use server";

import { withSiteAuth } from "@/lib/auth";
import { Website } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";

export const createMotion = withSiteAuth(async (_: FormData, site: Website) => {
  const response = await prisma.politicianMotion.create({
    data: {
      websiteId: site.id,
    },
  });

  revalidateTag(`${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-law`);
  site.customDomain && revalidateTag(`${site.customDomain}-law`);

  return response;
});
