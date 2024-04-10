import Form from "@/components/form";
import { editUser } from "@/lib/actions/user/user.update.action";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession()

  if(!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen space-y-6">
      <Form
        title="Nome"
        description="Seu nome nesta plataforma."
        helpText="Por favor use no máximo 32 caracteres."
        inputAttrs={{
          name: "name",
          type: "text",
          defaultValue: session.user.name!,
          placeholder: "Brendon Urie",
          maxLength: 32,
        }}
        handleSubmit={editUser}
      />
      <Form
        title="Logo"
        description="A logo do seu perfil. Formatos aceitos: .png, .jpg, .jpeg, .webp"
        helpText="Arquivo de no máximo 5MB. Tamanho recomendado 400x400."
        inputAttrs={{
          name: "logo",
          type: "file",
          defaultValue: session.user.image!,
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
          defaultValue: session.user.email!,
          placeholder: "panic@thedis.co",
        }}
        handleSubmit={editUser}
      />
    </div>
  );
}
