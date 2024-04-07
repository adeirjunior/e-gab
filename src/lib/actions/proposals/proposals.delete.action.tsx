"use server";

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { hasSubscription } from "@/lib/helpers/billing";
import { ProposalTypes } from "@prisma/client";

export const deleteProposal = async (type: ProposalTypes) => {
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

  const response = await prisma.proposal.delete({
    where: {
      type,
    },
  });

  return response;
};
