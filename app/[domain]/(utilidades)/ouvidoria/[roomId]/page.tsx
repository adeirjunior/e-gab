import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";
import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: {
    roomId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { roomId } = params;
  const session = await getSession()

  if(!session?.user) {
    return redirect("/")
  }

  const chatRoom = await prisma.chatRoom.findUnique({
    where: {
        id: roomId
    }
  })

    if (!chatRoom) {
      notFound();
    }

  const existingMessages = await prisma.message.findMany({
    where: {
      chatRoomId: roomId,
    },
  });

  const serializedMessages = existingMessages.map((message) => ({
    text: message.text,
    id: message.id,
    userId: message.userId
  }));

  return (
    <Card className="flex max-h-screen flex-col justify-between bg-transparent">
      <CardHeader>
        <Card className="w-full px-4 py-6">
          <h2 className="m-0 p-0 text-gray-300">Mensagens:</h2>
        </Card>
      </CardHeader>
      <CardBody>
        <Messages roomId={roomId} sessionUserId={session.user.id} initialMessages={serializedMessages} />
      </CardBody>
      <CardFooter>
        <MessageField userId={session.user.id} roomId={roomId} />
      </CardFooter>
    </Card>
  );
};

export default page;
