"use server";

import { withLawAuth } from "@/lib/auth";
import prisma from "@/lib/configs/prisma";

export const deleteLaw = withLawAuth(async (formData, law) => {
  try {
    return await prisma.law.delete({
      where: {
        id: law.id,
      }
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});
