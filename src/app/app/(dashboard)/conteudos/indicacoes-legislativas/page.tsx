import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import CreateLawButton from "@/components/button/generic-dashboard-button";
import { Metadata } from "next";
import { createLegislativeIndication } from "@/lib/actions/legislative-indication/legislative-indication.create.action";
import DomainLinkTag from "@/components/domain-link-tag";
import IndicativeLegislation from "@/components/content/Indicative-legislation";

export const metadata: Metadata = {
  title: "Indicacoes Legislativas",
};

export default async function SitePosts() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await getWebsiteByUserId(session.user.id);

  if (!data) {
    throw new Error("Dados não encontrados.");
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center gap-4 space-y-2 sm:items-start lg:flex-row lg:justify-center">
          <h1 className="font-cal mb-0 w-60 truncate text-xl font-bold dark:text-white sm:w-auto sm:text-xl lg:text-3xl">
            Todas as Indicacoes Legislativas de {data.name}
          </h1>
          <DomainLinkTag
            subdomain={data.subdomain!}
            path="/indicacoes-legislativas"
          />
        </div>
        <CreateLawButton
          type="content"
          create={createLegislativeIndication}
          path="indicacoes-legislativas"
        >
          Criar Indicação Legislativa
        </CreateLawButton>
      </div>
      <IndicativeLegislation websiteId={data.id} />
    </>
  );
}
