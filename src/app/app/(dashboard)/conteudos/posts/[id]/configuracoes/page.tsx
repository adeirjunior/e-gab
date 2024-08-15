import prisma from "@/lib/configs/prisma";
import { notFound, redirect } from "next/navigation";
import Form from "@/components/form";
import { updatePostMetadata } from "@/lib/actions/post/post.update.action";
import DeletePostForm from "@/components/form/delete-content-form";
import { getSession } from "@/lib/auth/get-session";
import { getUserById } from "@/lib/fetchers/user";
import ImageForm from "@/components/form/image-form";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getGalleryImages } from "@/lib/fetchers/image";
import { deletePost } from "@/lib/actions/post/post.delete.action";

export default async function PostSettings({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: {
        include: {
          admin: true,
        },
      },
    },
  });

  const user = await getUserById(session.user.id)

  if (!post) {
    notFound();
  }

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (user.role === "admin" && !user.admin?.canEditPosts) {
    throw new Error("Você não tem permissão para editar posts.");
  }

  const website = await getWebsiteByUserId(session.user.id);
  const { resources } = await getGalleryImages(website?.cloudinaryDir!);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Configurações do Post
        </h1>
        <Form
          title="Post Slug"
          description="O slug é uma url amigável. Geralmente toda em minusculo e possui apenas letras, nómeros e hifens."
          helpText="Favoer usar um slug que é unico para este post."
          inputAttrs={{
            name: "slug",
            type: "text",
            defaultValue: post?.slug!,
            placeholder: "slug",
          }}
          handleSubmit={updatePostMetadata}
        />

        <ImageForm
        resources={resources}
          title="Thumbnail"
          description="A thumbnail do seu post. Formatos aceitos: .png, .jpg, .jpeg"
          helpText="Arquivo de no máximo 5MB. Tamanho recomendado 1200x630."
          inputAttrs={{
            name: "image",
            defaultValue: post?.image!,
          }}
          handleSubmit={updatePostMetadata}
        />

        <DeletePostForm handle={deletePost} contentName={post?.title!}>
          Deletar post
        </DeletePostForm>
      </div>
    </div>
  );
}
