import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";
import { AddNoteIcon } from "@/components/icons/AddNoteIcon";
import { CopyDocumentIcon } from "@/components/icons/CopyDocumentIcon";
import { DeleteDocumentIcon } from "@/components/icons/DeleteDocumentIcon";
import { EditDocumentIcon } from "@/components/icons/EditDocumentIcon";
import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { Button, Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
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

  if(!session?.user) {
    return redirect("/")
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
          user: true
        },
      },
      secretary: {
        include: {
          user: true
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
          sessionUserId={session.user.id}
          roomId={roomId}
          initialMessages={serializedMessages}
        />
      </CardBody>
      <CardFooter>
        <MessageField userId={session.user.id} roomId={roomId} />
      </CardFooter>
    </Card>
  );
};

export default page;
