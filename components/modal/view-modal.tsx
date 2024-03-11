"use client";

import BlurImage from "@/components/arquives/blur-image";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ChatRoom, Client, User } from "@prisma/client";
import { Bold, Text, Title } from "@tremor/react";

export default function ViewModal({
  room,
}: {
  room: ChatRoom & { client: Client & { user: User } };
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen} variant="light">
        Visualizar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Title>{room.title}</Title>
              </ModalHeader>
              <ModalBody>
                <Bold className="dark:text-gray-400">Descrição:</Bold>
                <Text className="dark:text-gray-400">{room.description}</Text>
                {room.startingFiles.map((file,index) => (
                  <BlurImage key={index} width={300} height={600} alt="" src={file} />
                ))}
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
