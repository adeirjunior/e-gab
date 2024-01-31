import { ReactNode } from "react";
import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { notFound, redirect } from "next/navigation";
import SiteSettingsNav from "./nav";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getCurrentDomain } from "@/lib/utils";
import DomainLinkTag from "@/components/domain-link-tag";

export default async function SiteAnalyticsLayout({
  children,
}: {
  params: { id: string };
  children: ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const data = await getWebsiteByUserId(session.user.id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center space-x-4 space-y-2 sm:flex-row sm:space-y-0 pl-8 pt-8">
        <h1 className="m-0 font-cal text-xl font-bold sm:text-3xl dark:text-white">
          Configurações de {data.name}
        </h1>
      </div>
      <SiteSettingsNav />
      <div className="p-8">
        {children}
      </div>
      
    </>
  );
}
