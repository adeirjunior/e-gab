import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";
import { NextThemeProvider } from "@/app/next-themes-provider";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const site = await getWebsiteByUserId(session.user.id);

  if (!site) {
    redirect("/new");
  }

  return (
    <NextThemeProvider theme="dark">
      {" "}
      <div>
        <Nav subdomain={site.subdomain!}>
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        </Nav>
        <div className="min-h-screen sm:pl-60 dark:bg-black">{children}</div>
      </div>
    </NextThemeProvider>
  );
}
