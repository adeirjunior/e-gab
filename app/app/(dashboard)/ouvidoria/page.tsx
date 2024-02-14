import { getSession } from "@/lib/auth/get-session";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import { Bold, DonutChart, Grid, Text, Title } from "@tremor/react";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Pie from "./pie";

export default async function Page() {
  const session = await getSession();

  if (!session?.user) {
    return redirect("/");
  }

  const website = await getWebsiteByUserId(session.user.id);

  const rooms = await prisma.chatRoom.findMany({
    where: {
      websiteId: website?.id,
    },
    include: {
      client: {
        select: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      },
    },
    take: 4,
    orderBy: {
      createdAt: "asc",
    },
  });

  const pendingRooms = await prisma.chatRoom.count({
    where: {
      status: "pending",
    },
  });

  const activeRooms = await prisma.chatRoom.count({
    where: {
      status: "active",
    },
  });

  return (
    <div className="flex flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Estatísticas
        </h1>
      </div>
      <Grid
        className="mx-auto w-full place-content-center gap-4 sm:max-w-[900px]"
        numItems={1}
        numItemsSm={2}
        numItemsLg={3}
      >
        <Card className="w-full border-3 border-stone-300">
          <CardHeader>Salas abertas</CardHeader>
          <CardBody>
            <Bold className="text-3xl">{activeRooms > 0 ? activeRooms : "0"}</Bold>
          </CardBody>
        </Card>
        <Card className="w-full border-3 border-stone-300">
          <CardHeader>Solicitações pendentes</CardHeader>
          <CardBody>
            <Suspense
              fallback={
                <Skeleton>
                  <Bold className="text-3xl">Número de salas</Bold>
                </Skeleton>
              }
            >
              <Bold className="text-3xl">
                {pendingRooms > 0 ? pendingRooms : "0"}
              </Bold>
            </Suspense>
          </CardBody>
        </Card>
        <Card className="w-full border-3 border-stone-300">
          <CardHeader>Média de estrelas</CardHeader>
          <CardBody>
            <Bold className="text-3xl">4.3</Bold>
          </CardBody>
        </Card>
      </Grid>
      <Suspense
        fallback={
          <Skeleton>
            <div className="w-40 h-40 rounded-full"></div>
          </Skeleton>
        }
      >
        <Pie />
      </Suspense>
      <div className="flex flex-col space-y-6">
        <Bold className="font-cal text-3xl font-bold dark:text-white">
          Últimas Solicitações
        </Bold>
      </div>
      <Divider />
      {rooms.length > 0 ? (
        <Grid numItems={2} numItemsSm={3} numItemsLg={4} className="gap-4">
          {rooms.map((room) => (
            <div key={room.id}>
              <span className="relative z-40 flex h-4 w-4 -mb-3 -ml-3 float-end">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex h-4 w-4 rounded-full bg-sky-500"></span>
              </span>
              <Card>
              
              <CardHeader>
                <div className="flex flex-col">
                  <Title>
                    Sala de{" "}
                    <Bold>
                      {room.client.user?.name || room.client.user?.email}
                    </Bold>
                  </Title>
                  <Text className="dark:text-gray-400">{room.title}</Text>
                </div>
              </CardHeader>
              <CardBody>
                <Text className="dark:text-gray-400">{room.description}</Text>
              </CardBody>
              <CardFooter>
                <div className="flex w-full justify-between">
                  <div className="space-x-2">
                    <Button color="primary">Aceitar</Button>
                    <Button color="danger">Rejeitar</Button>
                  </div>
                  <Button variant="light">Visualizar</Button>
                </div>
              </CardFooter>
            </Card></div>
            
          ))}
        </Grid>
      ) : (
        "Sem salas solicitadas"
      )}
    </div>
  );
}
