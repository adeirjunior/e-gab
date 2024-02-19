import Messages from "@/components/Messages";
import ChatFooter from "@/components/chat/chat-footer";
import ChatHeader from "@/components/chat/chat-header";
import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { Message } from "@/lib/validations/message";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { User } from "@prisma/client";
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

const data = await prisma.chatRoom.findUnique({
  where: {
    id: roomId,
  },
  select: {
    client: {
      include: {
        user: {
          select: {
            image: true,
            name: true,
            email: true,
          },
        },
      },
    },
    politician: {
      include: {
        user: true,
      },
    },
    secretary: {
      include: {
        user: true,
      },
    },
  },
});


const chatPartner: User = data.politician?.user || data.secretary?.user;

if (!data || !chatPartner) {
  notFound();
}

    
  const existingMessages = await prisma.message.findMany({
    where: {
      chatRoomId: roomId,
    },
  });

  const serializedMessages: Message[] = existingMessages.map((message) => ({
    text: message.text,
    id: message.id,
    userId: message.userId,
    timestamp: message.createdAt
  }));

  return (
    <Card className="p:2 flex h-screen flex-1 flex-col justify-between sm:p-6">
      <CardHeader className="flex justify-between border-b-2 border-gray-200 py-3 sm:items-center">
        <ChatHeader />
      </CardHeader>
      <CardBody
        id="messages"
        className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex h-full flex-col justify-end space-y-4 overflow-y-auto p-3"
      >
        <Messages
          sessionUserId={session.user.id}
          chatPartner={chatPartner}
          initialMessages={serializedMessages}
          roomId={roomId}
        />
      </CardBody>
      <CardFooter className="mb-2 border-t-2 border-gray-200 px-0 pt-4 sm:mb-0">
        <ChatFooter userId={session.user.id} roomId={roomId} />
      </CardFooter>
    </Card>
  );
};

export default page;
