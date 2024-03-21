import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile/profile-wrapper";
import Nav from "@/components/nav";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers/site";

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
    redirect("/novo-usuario");
  }

  return (
    <div>
      <Nav site={site}>
        <Suspense fallback={<div>Carregando...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <div className="min-h-screen bg-white dark:bg-black sm:pl-60">
        {children}
      </div>
    </div>
  );
}
