import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { notFound, redirect } from "next/navigation";
import LegislativeIndicationEditor from "@/components/editor/Indicative-legislation-editor";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await prisma.legislativeIndication.findUnique({
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

  return <LegislativeIndicationEditor legislativeIndication={data} />;
}
