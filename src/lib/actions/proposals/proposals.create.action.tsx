"use server";

import { withSiteAuth } from "@/lib/auth";
import { ProposalTypes, Website } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { getSession } from "@/lib/auth/get-session";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { hasSubscription } from "@/lib/helpers/billing";

export const createProposal = async (proposal: FormData) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const hasSub = await hasSubscription();

  if (!hasSub) {
    return {
      error: `Você precisa assinar um plano para realizar este comando.`,
    };
  }

  const site = await getWebsiteByUserId(session.user.id);

  if (!site) {
    return {
      error: "Erro ao encontrar site.",
    };
  }

  const type = proposal.get("type") as ProposalTypes;
  const description = proposal.get("description") as string;

  if (!type || !description) {
    return {
      error: "Erro em encontrar conteúdo.",
    };
  }

  const response = await prisma.proposal.create({
    data: {
      website: {
        connect: {
          id: site.id,
        },
      },
      description,
      type,
    },
  });

  revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-proposals`,
  );
  site.customDomain && revalidateTag(`${site.customDomain}-proposals`);

  return response;
};
