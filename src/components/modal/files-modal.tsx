import { userSession } from "@/lib/auth/get-session";
import { getGalleryImages } from "@/lib/fetchers/image";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import GalleryList from "../arquives/gallery-list";


export default async function FilesModal({
  isOpen,
  onOpenChange,
  session,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  session: userSession;
}) {
 
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modal Title
            </ModalHeader>
            <ModalBody>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}