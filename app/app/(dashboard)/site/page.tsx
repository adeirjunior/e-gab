import Form from "@/components/form";
import DeleteSiteForm from "@/components/form/delete-site-form";
import { updateSite } from "@/lib/actions/website/website.update.action";
import { getSession } from "@/lib/auth";
import { getWebsiteByUserId } from "@/lib/fetchers";
import { redirect } from "next/navigation";

export default async function SiteSettingsIndex() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await getWebsiteByUserId(session.user.id);

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Nome"
        description="O nome do seu site. Isto sera usado como titúlo do seu site no Google também."
        helpText="Favor usar no máximo 32 caracteres."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data?.name!,
          placeholder: "Meu site maravilhoso",
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Descrição"
        description="A descrição do seu site. Isto sera usado como descrição do seu site no Google também."
        helpText="Inclua palacras-chave para ser melhor posicionado no Google."
        inputAttrs={{
          name: "description",
          type: "text",
          defaultValue: data?.description!,
          placeholder:
            "Site de político com anos trabalhando em projetos para melhorar a vida da população.",
        }}
        handleSubmit={updateSite}
      />

      <DeleteSiteForm siteName={data?.name!} />
    </div>
  );
}
