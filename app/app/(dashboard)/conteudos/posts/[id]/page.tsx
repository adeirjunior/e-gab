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
      content: {
        include: {
          blocks: {
            include: {
              data: true,
            },
          },
        },
      },
    },
  });

  if (!data || data.userId !== session.user.id || !data.outputDataId) {
    notFound();
  }

  return <Editor post={data} />;
}
