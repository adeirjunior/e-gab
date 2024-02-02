"use server";

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import {  SocialMediaTypes } from "@prisma/client";

export const deleteSocial = async (type: SocialMediaTypes) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const response = await prisma.socialMedia.delete({
    where: {
      type
    }
  });

  return response;
}
