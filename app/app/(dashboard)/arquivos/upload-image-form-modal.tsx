"use client";

import Uploader from "@/components/uploader";
import { create } from "@/lib/actions/image/image.create.action";
import { websiteImagePathCreator } from "@/lib/utils/cloudinary-path-creators";
import va from "@vercel/analytics";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import LoadingDots from "@/components/icons/loading-dots";

export default function UploadImageFormModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const { update } = useSession();
  const [isPendingRoomCreation, startRoomCreation] = useTransition();

  return (
    <>
      <Button startContent={<Upload />} onPress={onOpen} color="primary">
        Upload
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Upload</ModalHeader>
              <ModalBody>
                <form
                  action={async (data: FormData) => {
                    try {
                      startRoomCreation(() => {
                        create(data, websiteImagePathCreator, "image").then(
                          async (res: any) => {
                            if (res.error) {
                              toast.error(res.error);
                              console.error(res.error);
                            } else {
                              va.track(`Updated image`);
                              await update();
                              onClose();
                              router.refresh();
                              toast.success(`Atualizada imagem com sucesso!`);
                            }
                          },
                        );
                      });
                    } catch (error: any) {
                      toast.error(error.message);
                    }
                  }}
                  id="upload"
                >
                  <Uploader name="image" />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  form="upload"
                  color="primary"
                  disabled={isPendingRoomCreation}
                  spinner={<LoadingDots color="#808080" />}
                  isLoading={isPendingRoomCreation}
                >
                  {isPendingRoomCreation ? "" : "Fazer upload"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
