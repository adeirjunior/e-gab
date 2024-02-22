"use client";

import LoadingDots from "@/components/icons/loading-dots";
import Uploader from "@/components/uploader";
import { createChatRoom } from "@/lib/actions/chatRoom/chatRoom.create.action";
import { getSession } from "@/lib/auth/get-session";
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
import { Grid, Text, TextInput, Textarea, Title } from "@tremor/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormModal({ subdomain }: { subdomain: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isPendingRoomCreation, startRoomCreation] = useTransition();
  const { register, handleSubmit } = useForm();

  const onSubmit = (fData) => {
    const data = new FormData();

    for (const key in fData) {
      data.append(key, fData[key]);
    }

    try {
      startRoomCreation(async () => {
        const session = await getSession();
        const website = await getWebsiteBySubdomain(subdomain);

        if (!session) {
          toast.error("Esta conta não existe.");
        } else {
          const client = await getClientByUser(session.user.id);
          const response = await createChatRoom(client.id, website.id, data);
          if ("error" in response) {
            toast.error(response.error);
          }
          onClose();
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

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
                  onSubmit={handleSubmit(onSubmit)}
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
                      {...register("fullname")}
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
                      {...register("email")}
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
                      {...register("tel")}
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
                      {...register("address")}
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
                      {...register("title")}
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
                      {...register("description")}
                      placeholder="Mensagem"
                      className="mt-2 max-h-40"
                    />
                  </div>
                  <Grid className="col-span-full gap-4" numItems={2}>
                    <Uploader {...register("image-upload")} />
                    <Uploader {...register("image-upload2")} />
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

      <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-between">
        <Title>Ouvidoria</Title>
        <Button className="w-full max-w-[280px] sm:w-36" onPress={onOpen}>
          Criar Sala
        </Button>
      </div>
    </>
  );
}
