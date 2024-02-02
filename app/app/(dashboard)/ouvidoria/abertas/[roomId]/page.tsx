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
  const session = await getSession();

  if(!session?.user) {
    return redirect("/")
  }

  const data = await prisma.chatRoom.findUnique({
    where: {
      id: roomId
    },
    select: {
      client: {
        include: {
          user: {
            select: {
              image: true,
              name: true,
              email: true,
            }
          }
        }
      }
    }
  })

  if(!data) {
    notFound()
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
      <Card className="bg-transparent max-h-screen flex flex-col justify-between">
      <CardHeader>
        <Card className="w-full px-4 py-6"><h2 className="dark:text-gray-300 p-0 m-0">{data?.client.user?.name || data?.client.user?.email}</h2></Card>
      </CardHeader>
      <CardBody>
        <Messages sessionUserId={session.user.id} roomId={roomId} initialMessages={serializedMessages} />
      </CardBody>
      <CardFooter>
        <MessageField userId={session.user.id} roomId={roomId} />
      </CardFooter>
    </Card>
  );
};

export default page;
