"use server";

import { withPostAuth } from "@/lib/auth";
import prisma from "@/lib/configs/prisma";
import { hasSubscription } from "@/lib/helpers/billing";
import { Post } from "@prisma/client";

export const deletePost = withPostAuth(async (_: FormData, post: Post) => {
  try {
    const hasSub = await hasSubscription();

    if (!hasSub) {
      return {
        error: `Você precisa assinar um plano para realizar este comando.`,
      };
    }

    const response = await prisma.post.delete({
      where: {
        id: post.id,
      },
      select: {
        websiteId: true,
      },
    });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});
