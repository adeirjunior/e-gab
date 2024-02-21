"use server";

import { withPostAuth } from "@/lib/auth";
import prisma from "@/lib/configs/prisma";
import { hasSubscription } from "@/lib/helpers/billing";
import { Law } from "@prisma/client";

export const deleteLaw = withPostAuth(async (_: FormData, law: Law) => {
  const hasSub = await hasSubscription();

  if (!hasSub) {
    return {
      error: `Você precisa assinar um plano para realizar este comando.`,
    };
  }

  try {
    const response = await prisma.law.delete({
      where: {
        id: law.id,
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
