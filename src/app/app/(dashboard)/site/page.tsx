import Form from "@/components/form";
import { updateSite } from "@/lib/actions/website/website.update.action";
import { getSession } from "@/lib/auth/get-session";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { redirect } from "next/navigation";

export default async function SiteSettingsIndex() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await getWebsiteByUserId(session.user.id);

  if (!data) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Nome"
        description="O nome do seu site. Isto sera usado como titúlo do seu site no Google também."
        helpText="Favor usar no máximo 32 caracteres."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: data.name!,
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
          defaultValue: data.description!,
          placeholder:
            "Site de político com anos trabalhando em projetos para melhorar a vida da população.",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Título da página inicial"
        description="A descrição do seu site. Isto sera usado como descrição do seu site no Google também."
        helpText="Inclua palacras-chave para ser melhor posicionado no Google."
        inputAttrs={{
          name: "heroTitle",
          type: "text",
          defaultValue: data.heroTitle!,
          placeholder:
            "Site de político com anos trabalhando em projetos para melhorar a vida da população.",
        }}
        handleSubmit={updateSite}
      />

      <Form
        title="Descrição da página inicial"
        description="A descrição do seu site. Isto sera usado como descrição do seu site no Google também."
        helpText="Inclua palacras-chave para ser melhor posicionado no Google."
        inputAttrs={{
          name: "heroDescription",
          type: "text",
          defaultValue: data.heroDescription!,
          placeholder:
            "Site de político com anos trabalhando em projetos para melhorar a vida da população.",
        }}
        handleSubmit={updateSite}
      />
    </div>
  );
}
