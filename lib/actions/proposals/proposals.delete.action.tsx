"use server";

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { ProposalTypes } from "@prisma/client";

export const deleteProposal = async (type: ProposalTypes) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const response = await prisma.proposal.delete({
    where: {
      type
    }
  });

  return response;
}
