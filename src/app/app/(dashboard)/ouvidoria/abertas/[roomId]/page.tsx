import MessageField from "@/components/chat/MessageField";
import Messages from "@/components/chat/Messages";
import { getSession } from "@/lib/auth/get-session";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { User } from "@prisma/client";
import { Title } from "@tremor/react";
import { notFound, redirect } from "next/navigation";
import ActionsDropDown from "./actions-dropdown";
import WhatsAppButton from "@/components/button/whatsapp-button";
import { getRoomById } from "@/lib/fetchers/room";
import { getAllMessagesFromRoomId } from "@/lib/fetchers/message";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getGalleryImages } from "@/lib/fetchers/image";

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

  const data = await getRoomById(roomId)

  if (!data || !data.politician?.user) {
    notFound();
  }

  const chatPartner: User = data.client?.user as User;

 if (!chatPartner) {
   notFound();
 }

  const existingMessages = await getAllMessagesFromRoomId(roomId);

  const website = await getWebsiteByUserId(session.user.id);
  const { resources } = await getGalleryImages(website?.cloudinaryDir!);

  return (
    <Card className="flex h-screen max-h-screen flex-1 flex-col justify-between bg-transparent">
      <CardHeader>
        <Card className="flex w-full flex-col items-center justify-between space-y-6 px-4 py-6 sm:flex-row">
          <Card>
            <Title className="m-0 p-0 dark:text-gray-300">
              {data?.client.user?.name || data?.client.user?.email}:
            </Title>
            <Title>{data.title}</Title>
          </Card>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <WhatsAppButton phoneNumber={data.tel} />
            <ActionsDropDown chatRoom={data} />
          </div>
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
      <CardFooter className="overflow-visible">
        <MessageField resources={resources} session={session} roomId={roomId} />
      </CardFooter>
    </Card>
  );
};

export default page;
