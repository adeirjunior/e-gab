"use server";

import { SocialMediaTypes } from "@prisma/client";
import prisma from "@/lib/configs/prisma";

export async function getSocialByType(type: SocialMediaTypes) {
  const proposal = await prisma.socialMedia.findUnique({
    where: {
      type,
    },
  });

  if (!proposal) {
    return {
      error: "Social esta vazia.",
    };
  }

  return proposal;
}
