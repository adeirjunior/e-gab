"use client";

import { Button, Card, Input } from "@nextui-org/react";
import axios from "axios";
import { FC, useState } from "react";

interface MessageFieldProps {
  roomId: string;
}

const MessageField: FC<MessageFieldProps> = ({ roomId }) => {
    const [input, setInput] = useState<string>("");

  const sendMessage = async (text: string) => {
    await axios.post("/api/message", { text, roomId });
  };

  return (
    <Card className="flex w-full p-4 gap-2 flex-row items-center justify-center">
      <Input
        onChange={({ target }) => setInput(target.value)}
        radius="full"
        placeholder="Escreva sua mensagem"
        type="text"
      />
      <Button onClick={() => sendMessage(input || "")}>Enviar</Button>
    </Card>
  );
};

export default MessageField;
