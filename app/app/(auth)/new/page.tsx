import CreateSiteModal from "@/components/modal/create-site";
import { getSession } from "@/lib/auth/get-session";
import { getPoliticianSiteByUser } from "@/lib/fetchers/site";
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

  const data = await getPoliticianSiteByUser(session.user.id);

  if (data) {
    redirect("/site");
  }

  return (
    <>
      <div className="my-8 flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold text-gray-200">
          Bem-vindo ao E-Gab!
        </h1>
        <p className="text-lg font-semibold text-gray-200">
          Faça as configurações iniciais necessárias pra começar a usar nossa
          plataforma.
        </p>
      </div>
      <CreateSiteModal />
    </>
  );
}
