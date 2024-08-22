import prisma from "@/lib/configs/prisma";
import { notFound, redirect } from "next/navigation";
import Form from "@/components/form";
import { getSession } from "@/lib/auth/get-session";
import { getUserById } from "@/lib/fetchers/user";
import DeleteContentForm from "@/components/form/delete-content-form";
import { deleteMotion } from "@/lib/actions/motion/motion.delete.action";
import { updateMotionMetadata } from "@/lib/actions/motion/motion.update.action";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getGalleryImages } from "@/lib/fetchers/image";
import ImageForm from "@/components/form/image-form";

export default async function MotionSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const motion = await prisma.politicianMotion.findUnique({
    where: {
      id: params.id,
    },
  });

  const user = await getUserById(session.user.id);

  if (!motion) {
    notFound();
  }

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (user.role === "admin" && !user.admin?.canViewMotion) {
    throw new Error("Você não tem permissão para editar moções.");
  }

  const website = await getWebsiteByUserId(session.user.id);
  const { resources } = await getGalleryImages(website?.cloudinaryDir!);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Configurações da Moção
        </h1>
        <Form
          title="Moção Slug"
          description="O slug é uma url amigável. Geralmente toda em minusculo e possui apenas letras, nómeros e hifens."
          helpText="Favor usar um slug que é unico para esta moção."
          inputAttrs={{
            name: "slug",
            type: "text",
            defaultValue: motion?.slug!,
            placeholder: "slug",
          }}
          handleSubmit={updateMotionMetadata}
        />

        <ImageForm
          resources={resources}
          title="Thumbnail"
          description="A thumbnail da sua moção. Formatos aceitos: .png, .jpg, .jpeg"
          helpText="Arquivo de no máximo 5MB. Tamanho recomendado 1200x630."
          inputAttrs={{
            name: "image",
            defaultValue: motion?.image!,
          }}
          handleSubmit={updateMotionMetadata}
        />

        <DeleteContentForm handle={deleteMotion} contentName={motion?.title!}>
          Deletar moção
        </DeleteContentForm>
      </div>
    </div>
  );
}
