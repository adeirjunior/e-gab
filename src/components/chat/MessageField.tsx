"use client"

import { Button, Card, Input, useDisclosure } from "@nextui-org/react";
import { ImageIcon } from "lucide-react";
import { FC, useState } from "react";
import FilesModal from "../modal/files-modal";
import { userSession } from "@/lib/auth/get-session";

interface MessageFieldProps {
  roomId: string;
  session: userSession;
}

const  MessageField: FC<MessageFieldProps> = ({ roomId, session }) => {
  const [inputText, setInputText] = useState<string>("")
  const [file, setFile] = useState<string>("")
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const sendMessage = async (formData: FormData) => {
    const text = formData.get("message") as string;

   await fetch("/api/message", {
     method: "POST",
     body: JSON.stringify({ text, roomId, userId: session.user.id }),
   });
   setInputText("")
  };

  return (
    <form className="w-full" method="POST" action={sendMessage}>
      <Card className="flex w-full flex-row items-center justify-center gap-2 p-4">
        <Input
          name="message"
          radius="full"
          placeholder="Escreva sua mensagem"
          type="text"
          onValueChange={setInputText}
          value={inputText}
          autoComplete="off"
        />
        <Button isIconOnly onPress={onOpen} radius="full">
          <ImageIcon />
        </Button>
        <Button type="submit">Enviar</Button>
      </Card>
    </form>
  );
};

export default MessageField;
