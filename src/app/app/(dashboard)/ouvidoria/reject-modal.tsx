"use client";

import { updateChatRoom } from "@/lib/actions/chatRoom/chatRoom.update.action";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RejectModal({
  isOpen,
  onOpen,
  onOpenChange,
  fullChatRoom,
  updateAccept,
  id,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  fullChatRoom: any;
  updateAccept: any;
  id: string;
}) {
  const [isPending, start] = useTransition();
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (fData: { reason: string }) => {
    const name = Object.keys(fData)[0];
    const formData = new FormData();
    formData.append(name, fData.reason);
    const statusFormData = new FormData();
    statusFormData.append("status", "denied");

    try {
      start(async () => {
        const room = await updateChatRoom(formData, id, name);
        await updateChatRoom(statusFormData, id, "status");
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Tem certeza?
            </ModalHeader>
            <ModalBody>
              <p>
                Ao rejeitar este contato você poderá estar recusando de ouvir as
                reclamações de um eleitor
              </p>
              <form id="reason" onSubmit={handleSubmit(onSubmit as any)}>
                <Textarea
                  {...register("reason")}
                  required
                  placeholder="Escreva o motivo desta sala ter sido rejeitada."
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                form="reason"
                type="submit"
                color="danger"
                variant="light"
                onPress={onClose}
              >
                Confirmar
              </Button>

              <Button color="primary" onPress={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
