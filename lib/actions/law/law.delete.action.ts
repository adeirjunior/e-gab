"use server";

import { withPostAuth } from "@/lib/auth";
import prisma from "@/lib/configs/prisma";
import { Law } from "@prisma/client";

export const deleteLaw = withPostAuth(async (_: FormData, law: Law) => {
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
