"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Bold, Text, Title } from "@tremor/react";

export default function ViewModal({title, description}: {title: string; description: string;}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
                <Title>{title}</Title>
              </ModalHeader>
              <ModalBody>
                <Bold className="dark:text-gray-400">Descrição:</Bold>
                <Text className="dark:text-gray-400">{description}</Text>
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