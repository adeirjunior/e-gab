"use server";

import { withSiteAuth } from "@/lib/auth";
import { OutputBlock, Website } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { getSession } from "@/lib/auth/get-session";
import { createContent } from "../editor/editor.create.action";
import { ExtendedOutputBlock } from "./post.update.action";

export const createPost = withSiteAuth(async (_: FormData, site: Website) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const outputData = await createContent();

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

