import MessageField from "@/components/chat/MessageField";
import Messages from "@/components/chat/Messages";
import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { User } from "@prisma/client";
import { Title } from "@tremor/react";
import { notFound, redirect } from "next/navigation";
import ActionsDropDown from "../../abertas/[roomId]/actions-dropdown";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getGalleryImages } from "@/lib/fetchers/image";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const session = await getSession();

  if (!session?.user) {
    return redirect("/");
  }

  const data = await prisma.chatRoom.findUnique({
    where: {
      id,
      OR: [{status: "denied"}, {status: "disabled"}]
    },
    include: {
      client: {
        include: {
          user: true,
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
      acceptedRequest: true,
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
      chatRoomId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const website = await getWebsiteByUserId(session.user.id);
  const { resources } = await getGalleryImages(website?.cloudinaryDir!);

  return (
    <Card className="flex max-h-screen flex-col justify-between bg-transparent">
      <CardHeader>
        <Card className="flex w-full flex-row items-center justify-between px-4 py-6">
          <Card>
            <Title className="m-0 p-0 dark:text-gray-300">
              {data?.admin?.user?.name || data?.admin?.user?.email}:
            </Title>
            <Title>{data.title}</Title>
          </Card>

          <ActionsDropDown chatRoom={data} />
        </Card>
      </CardHeader>
      <CardBody>
        <Messages
          chatPartner={chatPartner}
          sessionUser={session.user}
          roomId={id}
          initialMessages={existingMessages}
        />
      </CardBody>
      <CardFooter>
        <MessageField resources={resources} session={session} roomId={id} />
      </CardFooter>
    </Card>
  );
};

export default page;
