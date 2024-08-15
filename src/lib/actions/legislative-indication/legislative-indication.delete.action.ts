"use server";

import { withLegislativeIndicationAuth } from "@/lib/auth";
import prisma from "@/lib/configs/prisma";

export const deleteLegislativeIndication = withLegislativeIndicationAuth(
  async (formData, legislativeIndication) => {
    try {
      return await prisma.legislativeIndication.delete({
        where: {
          id: legislativeIndication.id,
        },
      });
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);
