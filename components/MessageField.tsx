import { createMessage } from "@/lib/actions/message/message.create.action";
import { Button, Card, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface MessageFieldProps {
  roomId: string;
  userId: string;
}

const MessageField: FC<MessageFieldProps> = ({ roomId, userId }) => {

  const sendMessage = async (formData: FormData) => {
    "use server"
    const text = formData.get("message") as string;
    await createMessage(text, userId, roomId );
  };

  return (
    <form className="w-full" action={sendMessage}>
      <Card className="flex w-full flex-row items-center justify-center gap-2 p-4">
        <Input
          name="message"
          radius="full"
          placeholder="Escreva sua mensagem"
          type="text"
        />
        <Button type="submit">Enviar</Button>
      </Card>
    </form>
  );
};

export default MessageField;
