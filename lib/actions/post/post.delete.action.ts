"use server";

import { withPostAuth } from "@/lib/auth";
import prisma from "@/lib/configs/prisma";
import { hasSubscription } from "@/lib/helpers/billing";
import { revalidateTag } from "next/cache";

export const deletePost = withPostAuth(async (formData, post) => {
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
      }
    });

    if (!response) {
      throw new Error("Failed to update post.");
    }

    revalidateTag(
      `${post.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    revalidateTag(
      `${post.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    if (post.website?.customDomain) {
      revalidateTag(`${post.website?.customDomain}-posts`);
      revalidateTag(`${post.website?.customDomain}-${post.slug}`);
    }

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});
