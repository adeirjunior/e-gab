import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { notFound, redirect } from "next/navigation";
import Editor from "@/components/editor/novel-editor";

export default async function PostPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      website: {
        select: {
          subdomain: true,
        },
      },
    user: {
      include: {
        admin: true
      }
    }
    },
  });

  if (!data) {
    notFound();
  }

  if(!data.user.admin?.canEditPosts) {
    throw new Error("Você não tem permissão para editar posts.")
  }

  return <Editor post={data} />;
}
