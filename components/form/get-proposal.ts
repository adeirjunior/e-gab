"use server"

import { ProposalTypes } from "@prisma/client";
import prisma from "@/lib/configs/prisma";

export async function getProposalByType(type: ProposalTypes) {
  const proposal = await prisma.proposal.findUnique({
    where: {
      type,
    },
  });

  if (!proposal) {
    return {
      error: "Proposta esta vazia."
    }
  }

  return proposal;
}
