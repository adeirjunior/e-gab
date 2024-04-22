"use server";
import { createMessage } from "@/lib/actions/message/message.create.action";
import { pusherServer } from "@/lib/configs/pusherServer";

export async function POST(req: Request) {
  const { text, roomId, userId, file } = await req.json();

  const { id, createdAt } = await createMessage(text, userId, roomId, file);

  pusherServer.trigger(roomId, "incoming-message", {
    id,
    text,
    userId,
    createdAt,
    file,
  });

  return new Response(JSON.stringify({ success: true }));
}
