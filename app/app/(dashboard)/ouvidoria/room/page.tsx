"use client";

import { getCurrentDomain } from "@/lib/utils";
import { Button, Card, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

const Page: FC = () => {
  const [roomIdInput, setRoomIdInput] = useState<string>("");
  const router = useRouter();

  const createRoom = async () => {
    const res = await fetch(getCurrentDomain("", "/api/rooms/create"));
    const roomId: string = await res.text();
    router.push(getCurrentDomain("", `room/${roomId}`));
  };

  const joinRoom = async (roomId: string) => {
    router.push(getCurrentDomain("", `room/${roomId}`));
  };

  return (
    <Card className="space-y-6 bg-transparent p-6">
      <Button radius="full" onClick={createRoom}>
        Criar Sala
      </Button>

      <Card className="flex flex-row items-center justify-center gap-4 p-4">
        <Input
          type="text"
          onChange={({ target }) => setRoomIdInput(target.value)}
          variant="bordered"
          radius="full"
          classNames={{
            inputWrapper: "dark:bg-black",
            input: "dark:text-gray-300",
          }}
        />
        <Button onClick={() => joinRoom(roomIdInput)}>Entrar na Sala</Button>
      </Card>
    </Card>
  );
};

export default Page;
