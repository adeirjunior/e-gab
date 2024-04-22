"use server";

import { withMotionAuth } from "@/lib/auth";
import prisma from "@/lib/configs/prisma";
import { PoliticianMotion } from "@prisma/client";

export const deleteMotion = withMotionAuth(async (_: FormData, motion: PoliticianMotion) => {
  try {
    const response = await prisma.politicianMotion.delete({
      where: {
        id: motion.id,
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
