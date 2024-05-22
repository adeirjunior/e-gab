import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { notFound, redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import EventEditor from "@/components/editor/event-editor";

export default async function page({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const website = await getWebsiteByUserId(session.user.id)

  const data = await prisma.event.findUnique({
    where: {
      id: params.id,
      websiteId: website?.id
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

  return <EventEditor event={data} />;
}
