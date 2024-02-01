import prisma from "@/lib/configs/prisma";
import { pusherServer } from "@/lib/configs/pusher"; 

export async function POST(req: Request) {
  const { text, roomId, userId } = await req.json();

  pusherServer.trigger(roomId, "incoming-message", text);

  await prisma.message.create({
    data: {
      text,
      chatRoomId: roomId,
      userId
    },
  });

  return new Response(JSON.stringify({ success: true }));
}
