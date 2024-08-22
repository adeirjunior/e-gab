import prisma from "@/lib/configs/prisma";
import { notFound, redirect } from "next/navigation";
import Form from "@/components/form";
import { getSession } from "@/lib/auth/get-session";
import { getUserById } from "@/lib/fetchers/user";
import DeleteContentForm from "@/components/form/delete-content-form";
import { deleteEvent } from "@/lib/actions/event/event.delete.action";
import { updateEventMetadata } from "@/lib/actions/event/event.update.action";

export default async function EventSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const event = await prisma.event.findUnique({
    where: {
      id: params.id,
    },
  });

  const user = await getUserById(session.user.id);

  if (!event) {
    notFound();
  }

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (user.role === "admin" && !user.admin?.canViewEvents) {
    throw new Error("Você não tem permissão para editar eventos.");
  }

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Configurações do Evento
        </h1>
        <Form
          title="Evento Slug"
          description="O slug é uma url amigável. Geralmente toda em minusculo e possui apenas letras, nómeros e hifens."
          helpText="Favor usar um slug que é unico para este evento."
          inputAttrs={{
            name: "slug",
            type: "text",
            defaultValue: event?.slug!,
            placeholder: "slug",
          }}
          handleSubmit={updateEventMetadata}
        />

        <DeleteContentForm handle={deleteEvent} contentName={event?.title!}>
          Deletar evento
        </DeleteContentForm>
      </div>
    </div>
  );
}
