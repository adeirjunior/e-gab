import { AppContainer } from "@/components/form/animatedSignupForm/AppContainer";
import CreateSiteModal from "@/components/modal/create-site";
import { getSession } from "@/lib/auth/get-session";
import { getUserById } from "@/lib/fetchers/user";
import { Bold } from "@tremor/react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Configurações Iniciais",
};

export default async function App() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await getUserById(session.user.id);

  return (
    <>
    <AppContainer />
    </>
  );
}
