"use client";

import { VerticalDotsIcon } from "@/components/icons/VerticalDotsIcon";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon, EyeIcon } from "lucide-react";
import { DeleteDocumentIcon } from "@/components/icons/DeleteDocumentIcon";
import { Bold, Text, Title } from "@tremor/react";
import BlurImage from "@/components/arquives/blur-image";
import AcceptModal from "../../../../components/modal/accept-modal";
import RejectModal from "./reject-modal";
import { updateChatRoom } from "@/lib/actions/chatRoom/chatRoom.update.action";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChatRoomStatus } from "@prisma/client";

export default function DemandsTableActions({
  demandsFormatted,
  isFullscreen,
}: {
  demandsFormatted: any;
  isFullscreen: boolean;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenAcceptModal,
    onOpen: onOpenAcceptModal,
    onOpenChange: onOpenChangeAcceptModal,
    onClose: onCloseAcceptModal,
  } = useDisclosure();
   const {
     isOpen: isOpenRejectModal,
     onOpen: onOpenRejectModal,
     onOpenChange: onOpenChangeRejectModal,
   } = useDisclosure();
  const router = useRouter();
   const [isPending, start] = useTransition();

  const updateAccept = (status: ChatRoomStatus) => {
    const formData = new FormData();
    formData.append("status", status);
    try {
      start(async () => {
        const room = await updateChatRoom(formData, demandsFormatted.id, "status");
        if ("error" in room) {
          toast.error(room.error);
        } else {
          router.refresh();
        }
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <AcceptModal
        fullChatRoom={demandsFormatted}
        isOpen={isOpenAcceptModal}
        onOpen={onOpenAcceptModal}
        onOpenChange={onOpenChangeAcceptModal}
        onClose={onCloseAcceptModal}
      />
      <RejectModal
        isOpen={isOpenRejectModal}
        fullChatRoom={demandsFormatted}
        id={demandsFormatted.id}
        updateAccept={updateAccept}
        onOpen={onOpenRejectModal}
        onOpenChange={onOpenChangeRejectModal}
      />
      {isFullscreen ? (
        <>
          <Tooltip content="Ver detalhes">
            <span
              onClick={onOpen}
              className="cursor-pointer text-lg text-default-400 active:opacity-50"
            >
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Editar">
            <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Deletar">
            <span className="cursor-pointer text-lg text-danger active:opacity-50">
              <DeleteDocumentIcon />
            </span>
          </Tooltip>
        </>
      ) : (
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <VerticalDotsIcon className="text-default-300" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              startContent={<EyeIcon />}
              onPress={onOpen}
              className="cursor-pointer text-lg text-default-400 active:opacity-50"
            >
              Ver detalhes
            </DropdownItem>
            <DropdownItem
              className="cursor-pointer text-lg text-default-400 active:opacity-50"
              onPress={onOpenAcceptModal}
              startContent={<EditIcon />}
            >
              Alterar entrega
            </DropdownItem>
            <DropdownItem
              className="cursor-pointer text-lg text-danger active:opacity-50"
              color="danger"
              onPress={onOpenRejectModal}
              startContent={<DeleteDocumentIcon />}
            >
              Cancelar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Title>{demandsFormatted.title}</Title>
              </ModalHeader>
              <ModalBody>
                <Bold className="dark:text-gray-400">Descrição:</Bold>
                <Text className="dark:text-gray-400">
                  {demandsFormatted.description}
                </Text>
                {demandsFormatted.startingFiles.map(
                  (file: any, index: number) => (
                    <BlurImage
                      key={index}
                      width={300}
                      height={600}
                      alt=""
                      src={file}
                    />
                  ),
                )}
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} variant="light">
                  Fechar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
