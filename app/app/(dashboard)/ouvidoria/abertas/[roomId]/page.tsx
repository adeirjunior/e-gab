import MessageField from "@/components/chat/MessageField";
import Messages from "@/components/chat/Messages";
import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { User } from "@prisma/client";
import { Title } from "@tremor/react";
import { notFound, redirect } from "next/navigation";
import ActionsDropDown from "./actions-dropdown";

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
      id: true,
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Card className="flex max-h-screen flex-col justify-between bg-transparent">
      <CardHeader>
        <Card className="flex w-full flex-row items-center justify-between px-4 py-6">
          <Title className="m-0 p-0 dark:text-gray-300">
            {data?.client.user?.name || data?.client.user?.email}
          </Title>
          <ActionsDropDown id={data.id} />
        </Card>
      </CardHeader>
      <CardBody>
        <Messages
          chatPartner={chatPartner}
          sessionUser={session.user}
          roomId={roomId}
          initialMessages={existingMessages}
        />
      </CardBody>
      <CardFooter>
        <MessageField userId={session.user.id} roomId={roomId} />
      </CardFooter>
    </Card>
  );
};

export default page;
