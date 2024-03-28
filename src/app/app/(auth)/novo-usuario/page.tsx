import { AppContainer } from "@/components/form/animatedSignupForm/AppContainer";
import { getSession } from "@/lib/auth/get-session";
import { getUserById } from "@/lib/fetchers/user";
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

  return (
    <>
    <AppContainer />
    </>
  );
}
