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

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});
