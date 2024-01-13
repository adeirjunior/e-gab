"use server"

import prisma from "@/lib/prisma";

export const getSiteFromPostId = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      websiteId: true,
    },
  });
  return post?.websiteId;
};