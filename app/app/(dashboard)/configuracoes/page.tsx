import Form from "@/components/form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { editUser } from "@/lib/actions";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
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
            defaultValue: session.user.name!,
            placeholder: "Brendon Urie",
            maxLength: 32,
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
    </div>
  );
}
