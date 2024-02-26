"use client";

import { useState, useTransition } from "react";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cn, getCurrentDomain } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { toast } from "sonner";
import LoadingDots from "@/components/icons/loading-dots";
import { createOrUpdateAcceptedRequest } from "@/lib/actions/chatRoom/chatRoom.create.action";
import { useRouter } from "next/navigation";

export default function AcceptModal({
  isOpen,
  onClose,
  onOpen,
  onOpenChange,
  fullChatRoom,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
  fullChatRoom: any;
}) {
  console.log(fullChatRoom);

  const [date, setDate] = useState<DateRange | undefined>(
    fullChatRoom.acceptedRequest
      ? {
          from: fullChatRoom.acceptedRequest.from,
          to: fullChatRoom.acceptedRequest.to ?? undefined,
        }
      : {
          from: new Date(),
          to: addDays(new Date(), 2),
        },
  );

  const [isLoading, start] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    const formData = new FormData();
    formData.append("from", date?.from?.toISOString()!);
    formData.append("to", date?.to?.toISOString()!);
    try {
      start(async () => {
        const request = await createOrUpdateAcceptedRequest(
          fullChatRoom.id,
          formData,
        );

        if ("error" in request) {
          toast.error(request.error);
        } else {
          onClose();
          router.push(getCurrentDomain("app", "/ouvidoria"));
        }
      });
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        placement="auto"
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Informações
              </ModalHeader>
              <ModalBody>
                <div className={cn("grid gap-2")}>
                  <p>O intervalo de dias que será entregue o pedido.</p>
                  {date?.from &&
                    (!date.to ? (
                      <>
                        <p>
                          Será entregue em{" "}
                          {format(date.from!, "PPP", { locale: ptBR })}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Será entregue dentre{" "}
                          {format(date.from!, "PPP", { locale: ptBR })} e{" "}
                          {format(date.to!, "PPP", { locale: ptBR })}
                        </p>
                      </>
                    ))}
                  <Calendar
                    locale={ptBR}
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    classNames={{
                      row: "flex justify-center",
                      head_row: "flex justify-center",
                      months:
                        "flex justify-center flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  disabled={isLoading}
                  spinner={<LoadingDots color="#808080" />}
                  isLoading={isLoading}
                  onPress={handleClick}
                >
                  {isLoading ? "" : "Aceitar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
