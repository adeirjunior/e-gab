"use server";

import { withPostAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";

export const deletePost = withPostAuth(async (_: FormData, post: Post) => {
  try {
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
