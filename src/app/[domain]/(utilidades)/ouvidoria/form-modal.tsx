"use client";

import LoadingDots from "@/components/icons/loading-dots";
import Uploader from "@/components/uploader";
import { createChatRoom } from "@/lib/actions/chatRoom/chatRoom.create.action";
import { getWebsiteBySubdomain } from "@/lib/fetchers/site";
import { getClientByUser } from "@/lib/fetchers/user";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ChatRoom } from "@prisma/client";
import { Grid, Text, TextInput, Textarea, Title } from "@tremor/react";
import { RollerCoaster } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function FormModal({
  subdomain,
  rooms,
}: {
  subdomain: string;
  rooms: ChatRoom[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const { update, data: session } = useSession();
  const [isPendingRoomCreation, startRoomCreation] = useTransition();
   const router = useRouter();

 function isNotDeniedRoom(rooms: ChatRoom[]): boolean {
   const result = rooms.some(
     (room) =>
       room.status !== "accepted" &&
       room.status !== "denied" &&
       room.status !== "completed" && 
       room.status !== "disabled"
   );
   return result;
 }

  return (
    <>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        placement="auto"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Title>Detalhes da Sala</Title>
                <Text>
                  Escreva suas infomações básicas e passe em uma mensagem curta
                  descrevendo sobre o que você quer falar.
                </Text>
              </ModalHeader>
              <ModalBody>
                <form
                  id="room"
                  action={async (data: FormData) => {
                   try {
                     startRoomCreation(async () => {
                       const website = await getWebsiteBySubdomain(subdomain);

                       if (website) {
                         if (!session) {
                           toast.error("Esta conta não existe.");
                         } else {
                           const client = await getClientByUser(
                             session.user.id,
                           );

                          createChatRoom(client.id, website.id, data)
                            .then((response) => {
                              if (response && "error" in response) {
                                toast.error(response.error);
                              } else if (!response) {
                                toast.error("Sala esta indefinida")
                              }else {
                                toast.success("Sala criada.");
                                update();
                                router.refresh();
                                onClose();
                              }
                            })
                            .catch((error) => {
                              console.error("Erro ao criar sala:", error);
                            });
                         }
                       }
                     });
                   } catch (error: any) {
                     toast.error(error.message);
                   }
                  }}
                  className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6"
                >
                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="full-name"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Nome completo
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      type="text"
                      name="fullname"
                      placeholder="Nome completo"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Email
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Whatsapp
                      <span className="text-red-500">*</span>
                    </label>
                    <TextInput
                      type="text"
                      name="tel"
                      placeholder="Seu número no whatsapp"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label
                      htmlFor="address"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Endereço
                    </label>
                    <TextInput
                      type="text"
                      name="address"
                      placeholder="Endereço"
                      className="mt-2"
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="postal-code"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Título
                    </label>
                    <TextInput
                      type="text"
                      name="title"
                      placeholder="Título"
                      className="mt-2"
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="postal-code"
                      className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                      Mensagem
                    </label>
                    <Textarea
                      name="description"
                      placeholder="Mensagem"
                      className="mt-2 max-h-40"
                    />
                  </div>
                  <Grid className="col-span-full gap-4" numItems={1}>
                    <Uploader name="image" />
                  </Grid>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button
                  form="room"
                  color="primary"
                  type="submit"
                  disabled={isPendingRoomCreation}
                  spinner={<LoadingDots color="#808080" />}
                  isLoading={isPendingRoomCreation}
                >
                  {isPendingRoomCreation ? "" : "Criar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <Title>Ouvidoria</Title>
        {isNotDeniedRoom(rooms) ? (
          <Button className="w-full sm:w-40" disabled>
            Já possui uma sala ativa
          </Button>
        ) : (
          <Button className="w-full max-w-[280px] sm:w-36" onPress={onOpen}>
            Criar Sala
          </Button>
        )}
      </div>
    </>
  );
}
