import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Editor, { PostWithSite } from "@/components/editor/post-editor";

export default async function PostPage({
  params,
}: {
  params: { id: string;  };
}) {
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
          subdomain: true
        }
      },
      content: {
        include: {
          blocks: {
            include: {
              data: true
            }
          }
        }
      }
    }
  });

  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return <Editor post={data as PostWithSite} />;
}
