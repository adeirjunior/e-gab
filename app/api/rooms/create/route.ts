import prisma from "@/lib/configs/prisma";

export async function GET(req: Request) {
  const { clientId, websiteId } = await req.json();

  const createdRoom = await prisma.chatRoom.create({
    data: {
      clientId,
      websiteId
    },
  });

  return new Response(createdRoom.id);
}
