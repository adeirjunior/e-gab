import { getSession } from "@/lib/auth/get-session";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from "@nextui-org/react";
import { Bold, Grid } from "@tremor/react";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Pie from "./pie";
import PendingRoomCard from "./pending-room-card";
import { countRoomsWithStatus, getRoomsWithLimitAndStatus } from "@/lib/fetchers/room";

export default async function Page() {
  const session = await getSession();

  if (!session?.user) {
    return redirect("/");
  }

  const website = await getWebsiteByUserId(session.user.id);

  const rooms = await getRoomsWithLimitAndStatus(website.id, 4, "pending")

  const pendingRooms = await countRoomsWithStatus(website.id, "pending")

  const activeRooms = await countRoomsWithStatus(website.id, "active")

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
            <Bold className="text-3xl">
              {activeRooms > 0 ? activeRooms : "0"}
            </Bold>
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
            <div className="h-40 w-40 rounded-full"></div>
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
        <Grid numItems={1} numItemsLg={2} className="gap-4 xl:grid-cols-3">
          {rooms.map((room) => (
            <PendingRoomCard key={room.id} id={room.id} room={room as any}/>
          ))}
        </Grid>
      ) : (
        "Sem salas solicitadas"
      )}
    </div>
  );
}
