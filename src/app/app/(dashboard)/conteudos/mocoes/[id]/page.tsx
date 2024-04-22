import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { notFound, redirect } from "next/navigation";
import MotionEditor from "@/components/editor/motion-editor";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.politicianMotion.findUnique({
    where: {
      id: params.id,
    },
    include: {
      website: {
        select: {
          subdomain: true,
        },
      },
    },
  });

  if (!data) {
    notFound();
  }

  return <MotionEditor motion={data} />;
}
