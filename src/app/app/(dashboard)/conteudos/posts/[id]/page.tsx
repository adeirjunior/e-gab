import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { notFound, redirect } from "next/navigation";
import Editor from "@/components/editor/novel-editor";
import { getUserById } from "@/lib/fetchers/user";

export default async function PostPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const post = await prisma.post.findUnique({
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

  

  const user = await getUserById(session.user.id)

  if (!post) {
    notFound();
  }

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (user.role === "admin" && !user.admin?.canViewPosts) {
    throw new Error("Você não tem permissão para editar posts.");
  }

  return <Editor post={post} />;
}
