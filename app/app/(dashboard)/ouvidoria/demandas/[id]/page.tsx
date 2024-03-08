import { getSession } from "@/lib/auth/get-session";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/configs/prisma";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function page({ params }: PageProps) {
  const { id } = params;
  const session = await getSession();

  if (!session?.user) {
    return redirect("/");
  }

  const data = await prisma.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      client: {
        include: {
          user: true,
        },
      },
      politician: {
        include: {
          user: true,
        },
      },
      secretary: {
        include: {
          user: true,
        },
      },
      acceptedRequest: true,
    },
  });

  if (!data || !data.politician?.user) {
    notFound();
  }

  return <div className="p-6">
    {data.title}
  </div>;
}
