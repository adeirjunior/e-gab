import { getSession } from "@/lib/auth/get-session";
import { notFound, redirect } from "next/navigation";
import { getPoliticianSiteByUser } from "@/lib/fetchers/site";
import CreateLawButton from "@/components/button/generic-dashboard-button";
import { getCurrentDomain } from "@/lib/utils";
import { Metadata } from "next";
import Laws from "@/components/laws";
import { createLaw } from "@/lib/actions/law/law.create.action";

export const metadata: Metadata = {
  title: "Leis",
};

export default async function SitePosts() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await getPoliticianSiteByUser(session.user.id);

  if (!data) {
    notFound();
  }

  const url = getCurrentDomain(data.subdomain!);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center gap-4 space-y-2 sm:items-start lg:flex-row lg:justify-center">
          <h1 className="mb-0 w-60 truncate font-cal text-xl font-bold sm:w-auto sm:text-xl lg:text-3xl dark:text-white">
            Todas as Leis de {data.name}
          </h1>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="m-0 truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          >
            {url} ↗
          </a>
        </div>
        <CreateLawButton type="content" create={createLaw} path="leis">
          Criar Lei
        </CreateLawButton>
      </div>
      <Laws />
    </>
  );
}
