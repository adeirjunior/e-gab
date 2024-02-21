import { pusherServer } from "@/lib/configs/pusher";

export async function POST(req: Request) {
  const { text, roomId } = await req.json();

  // trigger a pusher event named "incoming-message" that will
  // update the state of the messages for everyone.
  pusherServer.trigger(roomId, "incoming-message", {
    message: text,
  });

  return new Response(JSON.stringify({ success: true }));
}
