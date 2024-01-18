import Form from "@/components/form";
import { updateSite } from "@/lib/actions/website/website.update.action";
import { getSession } from "@/lib/auth";
import { getWebsiteByUserId } from "@/lib/fetchers";
import { redirect } from "next/navigation";

export default async function SiteSettingsDomains() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await getWebsiteByUserId(session.user.id);

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Subdominio"
        description="O subdominio do seu site."
        helpText="Favor usar no máximo 32 caracteres."
        inputAttrs={{
          name: "subdomain",
          type: "text",
          defaultValue: data?.subdomain!,
          placeholder: "subdominio",
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Domínio Customizado"
        description="O dominio customizado do seu site."
        helpText="Favor entrar um domínio válido."
        inputAttrs={{
          name: "customDomain",
          type: "text",
          defaultValue: data?.customDomain!,
          placeholder: "seudominio.com",
          maxLength: 64,
          pattern: "^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$",
        }}
        handleSubmit={updateSite}
      />
    </div>
  );
}
