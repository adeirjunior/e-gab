import { Grid } from "@tremor/react";
import PendingRoomCard from "../pending-room-card";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getRoomsWithStatus } from "@/lib/fetchers/room";
import DemandsTable from "../demands-table";

export default async function page() {
  const session = await getSession();

  if (!session?.user) {
    return redirect("/");
  }

  const website = await getWebsiteByUserId(session.user.id);

  const rooms = await getRoomsWithStatus(website?.id!, "accepted");

  return (
    <div className="p-6">
      <DemandsTable demands={rooms} />
    </div>
  );
}
