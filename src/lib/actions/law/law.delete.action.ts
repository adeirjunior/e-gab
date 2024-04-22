"use server";

import { withLawAuth } from "@/lib/auth";
import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { hasSubscription } from "@/lib/helpers/billing";
import { Law } from "@prisma/client";

export const deleteLaw = withLawAuth(async (_: FormData, law: Law) => {
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
