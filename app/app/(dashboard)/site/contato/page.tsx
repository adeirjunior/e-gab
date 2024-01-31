import prisma from "@/lib/configs/prisma";
import { getSession } from "@/lib/auth/get-session";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import Form from "@/components/form";
import { updateContact } from "@/lib/actions/contato/contato.update.action";

export default async function Page() {
  const session = await getSession();
  const website = await getWebsiteByUserId(session?.user.id!);
  
  const contact = await prisma.contact.findUnique({
    where: {
      id: website?.contactId
    }
  })

  return (
    <div className="flex flex-col space-y-6">
      <Form
        title="Email"
        description="O email que aparecerá para os usuários que acessarem o site."
        helpText="Por favor use um email válido."
        inputAttrs={{
          name: "email",
          type: "email",
          defaultValue: contact?.email!,
          placeholder: "Escreva aqui o email",
          maxLength: 32,
        }}
        handleSubmit={updateContact}
      />
      <Form
        title="Número"
        description="O número que aparecerá para os usuários que acessarem o site."
        helpText="Por favor use um número válido."
        inputAttrs={{
          name: "phone",
          type: "tel",
          defaultValue: contact?.phone!,
          placeholder: "Escreva aqui o número",
          maxLength: 32,
        }}
        handleSubmit={updateContact}
      />
    </div>
  );
}
