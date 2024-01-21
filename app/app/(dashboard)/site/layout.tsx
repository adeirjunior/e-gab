import { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import SiteSettingsNav from "./nav";
import { getWebsiteByUserId } from "@/lib/fetchers";
import { getCurrentDomain } from "@/lib/utils";

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

  const url = getCurrentDomain(data.subdomain!);

  return (
    <>
      <div className="flex flex-col items-center space-x-4 space-y-2 sm:flex-row sm:space-y-0 pl-8 pt-8">
        <h1 className="m-0 font-cal text-xl font-bold sm:text-3xl dark:text-white">
          Configurações de {data.name}
        </h1>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
        >
          {url} ↗
        </a>
      </div>
      <SiteSettingsNav />
      <div className="p-8">
        {children}
      </div>
      
    </>
  );
}
