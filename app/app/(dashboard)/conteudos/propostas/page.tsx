import ProposalCard from "@/components/card/proposal-card";
import CreateProposalForm from "@/components/form/create-proposal-form";
import { getSession } from "@/lib/auth/get-session";
import { getPoliticianSiteByUser } from "@/lib/fetchers/site";
import { getCurrentDomain } from "@/lib/utils";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/configs/prisma";
import { Suspense } from "react";
import DomainLinkTag from "@/components/domain-link-tag";

export const metadata: Metadata = {
  title: "Propostas",
};

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await getPoliticianSiteByUser(session.user.id);

  if (!data) {
    notFound();
  }

  const proposals = await prisma.proposal.findMany({
    where: {
      websiteId: data.id,
    },
  });

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center gap-4 space-y-2 sm:items-start lg:flex-row lg:justify-center">
          <h1 className="mb-0 w-60 truncate font-cal text-xl font-bold sm:w-auto sm:text-xl lg:text-3xl dark:text-white">
            Todas as Propostas de {data.name}
          </h1>
          <DomainLinkTag subdomain={data.subdomain!} path="/#propostas" />
        </div>
      </div>
      <CreateProposalForm />
      <div className="w-full">
        <h2 className="mb-0 truncate font-cal text-xl font-bold sm:w-auto sm:text-xl lg:text-3xl dark:text-white">
          Propostas Adicionadas
        </h2>
      </div>
      <Suspense fallback={<div className="w-full h-72 rounded-xl bg-slate-500 animate-pulse"></div>}>
        <ProposalCard data={proposals} />
      </Suspense>
      
    </>
  );
}
