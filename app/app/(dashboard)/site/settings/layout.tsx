
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
      <div className="flex flex-col items-center space-x-4 space-y-2 sm:flex-row sm:space-y-0">
        <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
          Settings for Website
        </h1>
      </div>
      <SiteSettingsNav />
      {children}
    </>
  );
}
