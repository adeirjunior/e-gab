import prisma from "@/lib/configs/prisma";
import { notFound, redirect } from "next/navigation";
import Form from "@/components/form";
import { getSession } from "@/lib/auth/get-session";
import { getUserById } from "@/lib/fetchers/user";
import ImageForm from "@/components/form/image-form";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getGalleryImages } from "@/lib/fetchers/image";
import { deleteLaw } from "@/lib/actions/law/law.delete.action";
import DeleteContentForm from "@/components/form/delete-content-form";
import { updateLawMetadata } from "@/lib/actions/law/law.update.action";

export default async function LawSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const law = await prisma.law.findUnique({
    where: {
      id: params.id,
    }
  });

  const user = await getUserById(session.user.id);

  if (!law) {
    notFound();
  }

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (user.role === "admin" && !user.admin?.canViewLaws) {
    throw new Error("Você não tem permissão para editar leis.");
  }

  const website = await getWebsiteByUserId(session.user.id);
  const { resources } = await getGalleryImages(website?.cloudinaryDir!);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Configurações da Lei
        </h1>
        <Form
          title="Lei Slug"
          description="O slug é uma url amigável. Geralmente toda em minusculo e possui apenas letras, nómeros e hifens."
          helpText="Favoer usar um slug que é unico para esta lei."
          inputAttrs={{
            name: "slug",
            type: "text",
            defaultValue: law?.slug!,
            placeholder: "slug",
          }}
          handleSubmit={updateLawMetadata}
        />

        <ImageForm
          resources={resources}
          title="Thumbnail"
          description="A thumbnail da sua lei. Formatos aceitos: .png, .jpg, .jpeg"
          helpText="Arquivo de no máximo 5MB. Tamanho recomendado 1200x630."
          inputAttrs={{
            name: "image",
            defaultValue: law?.image!,
          }}
          handleSubmit={updateLawMetadata}
        />

        <DeleteContentForm handle={deleteLaw} contentName={law?.title!}>
          Deletar lei
        </DeleteContentForm>
      </div>
    </div>
  );
}
