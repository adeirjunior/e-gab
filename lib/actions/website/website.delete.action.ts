"use server"

import { withSiteAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Website } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const deleteSite = withSiteAuth(async (_: FormData, site: Website) => {
  try {
    const response = await prisma.website.delete({
      where: {
        id: site.id,
      },
    });
    await revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    response.customDomain &&
      (await revalidateTag(`${site.customDomain}-metadata`));
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});
