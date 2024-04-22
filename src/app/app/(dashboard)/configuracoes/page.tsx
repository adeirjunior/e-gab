import Form from "@/components/form";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { editUser } from "@/lib/actions/user/user.update.action";
import CurrentActivePlanCard from "@/components/card/current-active-plan-card";
import ImageForm from "@/components/form/image-form";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getGalleryImages } from "@/lib/fetchers/image";

export default async function SettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  const website = await getWebsiteByUserId(user.id!);
  const { resources } = await getGalleryImages(website?.cloudinaryDir!);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Configurações
        </h1>
        <Form
          title="Nome"
          description="Seu nome nesta plataforma."
          helpText="Por favor use no máximo 32 caracteres."
          inputAttrs={{
            name: "name",
            type: "text",
            defaultValue: user.name!,
            placeholder: "Brendon Urie",
            maxLength: 32,
          }}
          handleSubmit={editUser}
        />
        <ImageForm
        resources={resources}
          title="Logo"
          description="A logo do seu perfil. Formatos aceitos: .png, .jpg, .jpeg, .webp"
          helpText="Arquivo de no máximo 5MB. Tamanho recomendado 400x400."
          inputAttrs={{
            name: "image",
            defaultValue: user.image!,
          }}
          handleSubmit={editUser}
        />
        <Form
          title="Email"
          description="Seu email nesta plataforma."
          helpText="Por favor coloque um email valido."
          inputAttrs={{
            name: "email",
            type: "email",
            defaultValue: user.email!,
            placeholder: "panic@thedis.co",
          }}
          handleSubmit={editUser}
        />
        {user.role === "politician" && (
          <CurrentActivePlanCard session={session} plan="Grátis" />
        )}
      </div>
    </div>
  );
}
