import { AppContainer } from "@/components/form/animatedSignupForm/AppContainer";
import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
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

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (user?.role !== "invited") {
    redirect("/");
  }

  return (
    <>
      <AppContainer />
    </>
  );
}
