import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";
import prisma from "@/lib/configs/prisma";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

interface PageProps {
  params: {
    roomId: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { roomId } = params;
  const existingMessages = await prisma.message.findMany({
    where: {
      chatRoomId: roomId,
    },
  });

  const serializedMessages = existingMessages.map((message) => ({
    text: message.text,
    id: message.id,
  }));

  return (
      <Card className="bg-transparent max-h-screen flex flex-col justify-between">
      <CardHeader>
        <Card className="w-full px-4 py-6"><h2 className="text-gray-300 p-0 m-0">Mensagens:</h2></Card>
      </CardHeader>
      <CardBody>
        <Messages roomId={roomId} initialMessages={serializedMessages} />
      </CardBody>
      <CardFooter>
        <MessageField roomId={roomId} />
      </CardFooter>
    </Card>
  );
};

export default page;
