"use server";

import { getSession } from "@/lib/auth/get-session";
import { Website } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { withSiteAuth } from "@/lib/auth";

export const createExpenditure = withSiteAuth(
  async (_: FormData, site: Website) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const response = await prisma.expenditure.create({
      data: {
        websiteId: site.id,
      },
    });

    revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-expenditure`,
    );
    site.customDomain && revalidateTag(`${site.customDomain}-expenditure`);

    return response;
  },
);
