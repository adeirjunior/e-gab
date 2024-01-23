"use server";

import { withSiteAuth } from "@/lib/auth";
import { Website } from "@prisma/client";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { getSession } from "@/lib/auth/get-session";

export const createPost = withSiteAuth(async (_: FormData, site: Website) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const outputData = await prisma.outputData.create({
    data: {
      version: "1.0",
      blocks: {
        create: {
          type: "paragraph",
          data: {
            create: {
              text: ""
            }
          },
        },
      },
    },
  });

  const response = await prisma.post.create({
    data: {
      userId: session.user.id,
      websiteId: site.id,
      outputDataId: outputData.id,
    },
  });

  revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
  );
  site.customDomain && revalidateTag(`${site.customDomain}-posts`);

  return response;
});
