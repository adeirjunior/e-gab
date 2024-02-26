"use client";

import { AddNoteIcon } from "@/components/icons/AddNoteIcon";
import { DeleteDocumentIcon } from "@/components/icons/DeleteDocumentIcon";
import { EditDocumentIcon } from "@/components/icons/EditDocumentIcon";
import LoadingDots from "@/components/icons/loading-dots";
import { updateChatRoom } from "@/lib/actions/chatRoom/chatRoom.update.action";
import { cn } from "@/lib/utils";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { ChatRoomStatus } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import AcceptModal from "./accept-modal";

export default function ActionsDropDown({ chatRoom }: { chatRoom: any }) {
  const [isPending, start] = useTransition();
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const updateAccept = (status: ChatRoomStatus) => {
    const formData = new FormData();
    formData.append("status", status);
    start(async () => {
      const room = await updateChatRoom(formData, chatRoom.id, "status");
      if ("error" in room) {
        toast.error(room.error);
      } else {
        router.push("/ouvidoria/abertas");
      }
    });
  };

  return (
    <>
      <AcceptModal
        fullChatRoom={chatRoom}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      <Dropdown className="max-w-96">
        <DropdownTrigger>
          <Button
            isIconOnly
            variant="faded"
            aria-label="Take a photo"
            spinner={<LoadingDots color="#808080" />}
            isLoading={isPending}
          >
            {isPending ? "" : <MoreHorizontal />}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="faded"
          aria-label="Dropdown menu with description"
        >
          <DropdownSection title="Ações" showDivider>
            <DropdownItem
              key="new"
              shortcut="⌘N"
              onPress={onOpen}
              description="Clique aqui para ceitar o pedido feito."
              startContent={<AddNoteIcon className={iconClasses} />}
            >
              Aceitar
            </DropdownItem>
            <DropdownItem
              key="edit"
              shortcut="⌘⇧E"
              description="Clique aqui para rejeitar o pedido e passar uma mensagem de retorno do porque foi negado."
              startContent={<EditDocumentIcon className={iconClasses} />}
            >
              Rejeitar
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Área perigosa">
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              shortcut="⌘⇧D"
              onPress={() => updateAccept("disabled")}
              description="Desative esta conversa sem passar uma mensagem de retorno. Utilize apenas caso não esteja recebendo respostas, ou ocorra qualquer outro problema inesperado."
              startContent={
                <DeleteDocumentIcon
                  className={cn(iconClasses, "text-danger")}
                />
              }
            >
              Desativar
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
