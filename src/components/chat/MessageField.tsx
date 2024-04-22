"use client"

import { Button, Card, CardBody, CardHeader, Input, useDisclosure } from "@nextui-org/react";
import { ImageIcon } from "lucide-react";
import { FC, useState } from "react";
import FilesModal from "../modal/files-modal";
import { userSession } from "@/lib/auth/get-session";
import { SearchResult } from "@/lib/types/types";
import { CldImage } from "next-cloudinary";
import { RiCloseLine } from "@remixicon/react";

interface MessageFieldProps {
  roomId: string;
  session: userSession;
  resources: SearchResult[]
}

const MessageField: FC<MessageFieldProps> = ({
  roomId,
  session,
  resources,
}) => {
  const [inputText, setInputText] = useState<string>("");
  const [file, setFile] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const sendMessage = async (formData: FormData) => {
    const text = formData.get("message") as string;

    await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({ text, roomId, userId: session.user.id, file }),
    });
    setInputText("");
    setFile("");
  };

  return (
    <div className="flex flex-col w-full relative">
      {file && (
        <Card className="w-fit absolute bottom-full mb-4 left-0">
          <CardHeader>
            <Button isIconOnly onPress={() => setFile("")}>
              <RiCloseLine />
            </Button>{" "}
          </CardHeader>
          <CardBody>
            <CldImage alt="" width={100} height={100} src={file} />
          </CardBody>
        </Card>
      )}
      <form className="w-full" method="POST" action={sendMessage}>
        <FilesModal
          setFile={setFile}
          resources={resources}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
        />
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
    </div>
  );
};

export default MessageField;
