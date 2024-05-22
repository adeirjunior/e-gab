import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import prisma from "@/lib/configs/prisma";
import Image from "next/image";
import { Grid } from "@tremor/react";
import EventCardDashboard from "../card/event-card-dashboard";

export type contentArray = {
  websiteId: string;
  limit?: number;
};

export default async function Events({ websiteId, limit }: contentArray) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const events = await prisma.event.findMany({
    where: {
      websiteId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      website: true,
    },
    ...(limit ? { take: limit } : {}),
  });

  return events.length > 0 ? (
    <Grid numItemsMd={2} numItemsLg={3} className="w-full gap-4">
      {events.map((event) => (
        <EventCardDashboard key={event.id} data={event} />
      ))}
    </Grid>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">Sem eventos ainda</h1>
      <Image
        alt="missing law"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        Você não tem nenhum evento ainda. Crie um para começar.
      </p>
    </div>
  );
}
