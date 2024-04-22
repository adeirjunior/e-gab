"use server";

import { ProposalTypes } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { getSession } from "@/lib/auth/get-session";
import { getWebsiteByUserId } from "@/lib/fetchers/site";

export async function getProposalByType(type: ProposalTypes) {
  const session = await getSession()
  const website = await getWebsiteByUserId(session?.user.id!);
  const proposal = await prisma.proposal.findUnique({
    where: {
      type,
      websiteId: website?.id
    },
  });

  if (!proposal) {
    return {
      error: "Proposta esta vazia.",
    };
  }

  return proposal;
}
