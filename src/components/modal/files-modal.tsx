"use client"

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
} from "@nextui-org/react";
import { SearchResult } from "@/lib/types/types";
import SelectArchiveList from "../arquives/select-archive-list";
import { Dispatch, SetStateAction } from "react";
import UploadImageFormModal from "@/app/app/(dashboard)/arquivos/upload-image-form-modal";


export default function FilesModal({
  isOpen,
  onOpenChange,
  resources,
  setFile,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  resources: SearchResult[];
  setFile: Dispatch<SetStateAction<string>>;
}) {
  return (
    <Modal
      classNames={{
        wrapper: "max-h-screen",
        base: "max-h-screen",
        body: "overflow-scroll scrollbar-none",
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center justify-between py-10">
              <h2>Imagens</h2>
              <UploadImageFormModal />
            </ModalHeader>
            <ModalBody>
              <ScrollShadow hideScrollBar>
                <SelectArchiveList
                  setFile={setFile}
                  initialResources={resources}
                />
              </ScrollShadow>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}