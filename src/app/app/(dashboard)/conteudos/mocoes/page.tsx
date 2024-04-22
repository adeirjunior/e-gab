import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import CreateMotionButton from "@/components/button/generic-dashboard-button";
import { Metadata } from "next";
import DomainLinkTag from "@/components/domain-link-tag";
import Motions from "@/components/content/motions";
import { createMotion } from "@/lib/actions/motion/motion.create.action";

export const metadata: Metadata = {
  title: "Moções",
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
            Todas as Moções de {data.name}
          </h1>
          <DomainLinkTag subdomain={data.subdomain!} path="/mocoes" />
        </div>
        <CreateMotionButton type="content" create={createMotion} path="mocoes">
          Criar Moção
        </CreateMotionButton>
      </div>
      <Motions websiteId={data.id}/>
    </>
  );
}
