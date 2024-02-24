import { Grid } from "@tremor/react";
import PendingRoomCard from "../pending-room-card";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getRoomsWithStatus } from "@/lib/fetchers/room";

export default async function page() {
  const session = await getSession();

  if (!session?.user) {
    return redirect("/");
  }

  const website = await getWebsiteByUserId(session.user.id);

  const rooms = await getRoomsWithStatus(website?.id!, "disabled");

  return (
    <div>
      {rooms && rooms.length > 0 ? (
        <Grid numItems={1} numItemsLg={2} className="gap-4 xl:grid-cols-3">
          {rooms.map((room) => (
            <PendingRoomCard key={room.id} id={room.id} room={room as any} />
          ))}
        </Grid>
      ) : (
        "Sem salas fechadas"
      )}
    </div>
  );
}
