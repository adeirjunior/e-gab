"use server";

import { withPostAuth } from "@/lib/auth";
import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { hasSubscription } from "@/lib/helpers/billing";

export const deletePost = withPostAuth(async (formData, post) => {
  try {

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
