import Messages from "@/components/chat/Messages";
import ChatFooter from "@/components/chat/chat-footer";
import ChatHeader from "@/components/chat/chat-header";
import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
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
  const session = await getSession();

  if (!session?.user) {
    return redirect("/");
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
      admin: {
        include: {
          user: true,
        },
      },
    },
  });


    if (!data || !data.politician?.user) {
      notFound();
    }

  const chatPartner: User = data.politician?.user || data.admin?.user;

  if (!chatPartner) {
    notFound();
  }

  const existingMessages = await prisma.message.findMany({
    where: {
      chatRoomId: roomId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Card className="flex h-screen flex-1 flex-col justify-between sm:p-6">
      <CardHeader className="flex justify-between border-b-2 border-gray-200 py-3 sm:items-center">
        <ChatHeader chatPartner={chatPartner} />
      </CardHeader>
      <CardBody
        id="messages"
        className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex h-full flex-col justify-end space-y-4 overflow-y-auto p-3"
      >
        <Messages
          sessionUser={session.user}
          chatPartner={chatPartner}
          initialMessages={existingMessages}
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
