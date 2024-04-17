"use client"

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { SearchResult } from "@/lib/types/types";
import SelectArchiveList from "../arquives/select-archive-list";
import { Dispatch, SetStateAction } from "react";


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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Images</ModalHeader>
            <ModalBody>
              <SelectArchiveList
                setFile={setFile}
                initialResources={resources}
              />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}