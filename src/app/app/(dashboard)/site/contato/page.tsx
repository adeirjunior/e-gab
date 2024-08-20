import prisma from "@/lib/configs/prisma";
import { getSession } from "@/lib/auth/get-session";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import Form from "@/components/form";
import { updateContact } from "@/lib/actions/contato/contato.update.action";
import AutocompleteLocationGabinete from "@/components/editor/autocomplete-location-gabinete";
import AutocompleteForm from "@/components/form/autocomplete-form";

export default async function Page() {
  const session = await getSession();
  const website = await getWebsiteByUserId(session?.user.id!);

  if(!website) {
    throw new Error("Site não foi encontrado")
  }

  const contact = await prisma.contact.findUnique({
    where: {
      id: website?.contactId ?? undefined
    },
    include: {
      location: true
    }
  });

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
      <AutocompleteForm
        title="Localização do Gabinete"
        description="A localização aparecerá para os usuários que acessarem o site."
        helpText="Por favor use uma localização válida."
        inputAttrs={{
          name: "location",
          type: "text",
          defaultValue: contact?.location.formatted_address!,
          placeholder: "Escreva aqui o número",
          maxLength: 32,
        }}
        location={contact?.location!}
      />
    </div>
  );
}
