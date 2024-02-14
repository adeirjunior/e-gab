"use client";
import { pusherClient } from "@/lib/configs/pusher";
import { Card } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";

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
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    pusherClient.subscribe(roomId);

    pusherClient.bind("incoming-message", (text: string) => {
      setMessages([...messages, text]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, [messages, roomId]);


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
      {messages.map((text, i) => (
        <Card className="rounded-full px-6 py-4" isPressable key={i}>
          {text}
        </Card>
      ))}
    </div>
  );
};

export default Messages;
