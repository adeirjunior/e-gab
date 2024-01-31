"use client";
import { pusherClient } from "@/lib/configs/pusher";
import { Card } from "@nextui-org/react";
import { FC, useState } from "react";
import { useEffectOnce } from "usehooks-ts";

interface MessagesProps {
  initialMessages: {
    text: string;
    id: string;
  }[];
  roomId: string;
}

const Messages: FC<MessagesProps> = ({ initialMessages, roomId }) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  useEffectOnce(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", (text: string) => {
      setIncomingMessages((prev) => [...prev, text]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  });

  return (
    <div className="space-y-8 overflow-y-scroll">
      {initialMessages.map((message) => (
        <Card className="rounded-full px-6 py-4" isPressable key={message.id}>
          {message.text}
        </Card>
      ))}
      {incomingMessages.map((text, i) => (
        <Card className="rounded-full px-6 py-4" isPressable key={i}>
          {text}
        </Card>
      ))}
    </div>
  );
};

export default Messages;
