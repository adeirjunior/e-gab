import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile/profile-wrapper";
import Nav from "@/components/nav";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getUserById } from "@/lib/fetchers/user";
import { VerifyAlert } from "@/components/alerts";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  const user = await getUserById(session?.user.id!);

  if (!session || !user) {
    redirect("/login");
  }

  const site = await getWebsiteByUserId(session.user.id);

  if (!site) {
    redirect("/novo-usuario");
  }

  return (
    <div>
      <Nav site={site} user={user as any}>
        <Suspense fallback={<div>Carregando...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <div className="min-h-screen bg-white dark:bg-black sm:pl-60">
        {!user.emailVerified && <VerifyAlert />}
        {children}
      </div>
    </div>
  );
}
