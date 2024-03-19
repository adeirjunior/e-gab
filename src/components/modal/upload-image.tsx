"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Title } from "@tremor/react";
import { Website } from "@prisma/client";
import { SearchResult } from "@/lib/types/types";
import GalleryGrid from "@/app/app/(dashboard)/arquivos/gallery-grid";

export default function UploadImageModal({
  website,
  images,
}: {
  website: Website;
  images: SearchResult[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex flex-row items-center justify-between">
                  <Title>Galeria de Arquivos</Title>
                </div>
              </ModalHeader>
              <ModalBody>
                <GalleryGrid
                  websiteCloudinaryDir={website.cloudinaryDir}
                  images={images}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Publicar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
