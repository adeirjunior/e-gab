import Form from "@/components/form";
import ImageForm from "@/components/form/image-form";
import { updateSite } from "@/lib/actions/website/website.update.action";
import { getSession } from "@/lib/auth/get-session";
import { getGalleryImages } from "@/lib/fetchers/image";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { redirect } from "next/navigation";

export default async function SiteSettingsAppearance() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await getWebsiteByUserId(session.user.id);
  const { resources } = await getGalleryImages(data?.cloudinaryDir!);

  return (
    <div className="flex flex-col space-y-6">
      <ImageForm
        resources={resources}
        title="Thumbnail"
        description="A thumbnail do seu site. Formatos aceitos: .png, .jpg, .jpeg"
        helpText="Arquivo de no máximo 5MB. Tamanho recomendado 1200x630."
        inputAttrs={{
          name: "image",
          defaultValue: data?.image!,
        }}
        handleSubmit={updateSite}
      />
      <ImageForm
        resources={resources}
        title="Logo"
        description="A logo do seu site. Formatos aceitos: .png, .jpg, .jpeg"
        helpText="Arquivo de no máximo 5MB. Tamanho recomendado 400x400."
        inputAttrs={{
          name: "logo",
          defaultValue: data?.logo!,
        }}
        handleSubmit={updateSite}
      />
      <ImageForm
        resources={resources}
        title="Foto do político"
        description="A logo do seu site. Formatos aceitos: .png, .jpg, .jpeg"
        helpText="Arquivo de no máximo 5MB. Tamanho recomendado 400x400."
        inputAttrs={{
          name: "politicianPhoto",
          defaultValue: data?.politicianPhoto!,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Fonte"
        description="A fonte para o texto do seu site."
        helpText="Favor selecionar uma fonte."
        inputAttrs={{
          name: "font",
          type: "select",
          defaultValue: data?.font!,
        }}
        handleSubmit={updateSite}
      />
    </div>
  );
}
