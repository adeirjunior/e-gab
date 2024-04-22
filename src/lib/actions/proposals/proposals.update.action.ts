"use server"

import { getSession } from "@/lib/auth/get-session";
import { hasSubscription } from "@/lib/helpers/billing";
import { ProposalTypes } from "@prisma/client";
import prisma from "@/lib/configs/prisma";


export const updateProposal = async (proposal: FormData) => {
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

  const type = proposal.get("type") as ProposalTypes;
  const description = proposal.get("description") as string;

  if (!type) {
    return {
      error: "Erro em encontrar conteúdo.",
    };
  }

  const response = await prisma.proposal.update({
    where: {
      type,
    },
    data: {
      description,
    },
  });

  return response;
};
