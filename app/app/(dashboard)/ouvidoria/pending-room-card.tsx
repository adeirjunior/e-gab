"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { Bold, Text, Title } from "@tremor/react";
import ViewModal from "./view-modal";
import { ChatRoom, ChatRoomStatus, Client, User } from "@prisma/client";
import { updateChatRoom } from "@/lib/actions/chatRoom/chatRoom.update.action";
import LoadingDots from "@/components/icons/loading-dots";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PendingRoomCard({
  room,
  id,
}: {
  room: ChatRoom & { client: Client & { user: User } };
  id: string;
}) {
  const [isPending, start] = useTransition();
  const router = useRouter()

  const updateAccept = (status: ChatRoomStatus) => {
    const formData = new FormData();
    formData.append("status", status);
    start(async () => {
      const room = await updateChatRoom(formData, id, "status");
      if("error" in room) {
        toast.error(room.error)
      } else {
        router.refresh()
      }
    });
  };

  return (
    <div>
      <span className="relative z-40 float-end -mb-3 -ml-3 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex h-4 w-4 rounded-full bg-sky-500"></span>
      </span>
      <Card>
        <CardHeader>
          <div className="flex flex-col">
            <Title>
              Sala de{" "}
              <Bold>
                {room.client.user?.name ||
                  room.client.user?.email}
              </Bold>
            </Title>
            <Text className="dark:text-gray-400">{room.title}</Text>
          </div>
        </CardHeader>
        <CardBody>
          <Text className="dark:text-gray-400">{room.description}</Text>
        </CardBody>
        <CardFooter>
          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <form action={() => updateAccept("active")}>
                <Button
                  type="submit"
                  color="primary"
                  spinner={<LoadingDots color="#808080" />}
                  isLoading={isPending}
                >
                  {isPending ? "" : "Aceitar"}
                </Button>
              </form>
              <form action={() => updateAccept("denied")}>
                <Button type="submit" color="danger">
                  Rejeitar
                </Button>
              </form>
            </div>
            <ViewModal title={room.title} description={room.description} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
