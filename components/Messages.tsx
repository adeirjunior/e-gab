"use client";
import { pusherClient } from "@/lib/configs/pusher";
import { Card } from "@nextui-org/react";
import { FC, useState } from "react";
import { useEffectOnce } from "usehooks-ts";

interface MessagesProps {
  initialMessages: {
    text: string;
    id: string;
    userId: string;
  }[];
  roomId: string;
  sessionUserId: string;
}

const Messages: FC<MessagesProps> = ({
  initialMessages,
  roomId,
  sessionUserId,
}) => {
  const [mounted, setMounted] = useState(false);
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  useEffectOnce(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", (text: string) => {
      setIncomingMessages((prev) => [...prev, text]);
    });

    setMounted(true);

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  });

  if (!mounted) return null;

  return (
    <div className="space-y-8 overflow-y-scroll">
      {initialMessages.map((message) => (
        <>
          {message.userId === sessionUserId ? (
            <div key={message.id} className="flex w-full justify-end">
              <Card
                className="rounded-full rounded-br-lg bg-gray-300 px-6 py-4"
                isPressable
                key={message.id}
              >
                {message.text}
              </Card>
            </div>
          ) : (
            <div key={message.id} className="flex w-full justify-start">
              <Card
                className="rounded-full rounded-bl-lg bg-gray-200 px-6 py-4"
                isPressable
                key={message.id}
              >
                {message.text}
              </Card>
            </div>
          )}
        </>
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
