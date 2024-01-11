
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import SiteSettingsNav from "./nav";
import { ReactNode } from "react";

export default async function SiteAnalyticsLayout({children}: {children: ReactNode}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex flex-col px-4 pt-4 items-center space-x-4 space-y-2 sm:flex-row sm:space-y-0">
        <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
          Configurações do Site
        </h1>
      </div>
      <SiteSettingsNav />
      <div className="flex flex-col space-y-6 px-4 py-8">{children}</div>
    </>
  );
}
