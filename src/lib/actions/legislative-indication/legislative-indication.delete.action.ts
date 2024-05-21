"use server";

import { withLegislativeIndicationAuth } from "@/lib/auth";
import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { hasSubscription } from "@/lib/helpers/billing";
import { LegislativeIndication } from "@prisma/client";

export const deletewithLegislativeIndication = withLegislativeIndicationAuth(
  async (_: FormData, legislativeIndication: LegislativeIndication) => {
    try {
      const session = await getSession();
      if (!session?.user.id) {
        return {
          error: "Not authenticated",
        };
      }

      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });

      const hasSub = await hasSubscription();

      if (user?.role === "politician" && !hasSub) {
        return {
          error: `Você precisa assinar um plano para realizar este comando.`,
        };
      }

      const response = await prisma.legislativeIndication.delete({
        where: {
          id: legislativeIndication.id,
        },
      });

      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
);
