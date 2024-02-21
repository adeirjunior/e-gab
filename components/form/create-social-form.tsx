"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { FormButton } from ".";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSocial } from "@/lib/actions/socialMedias/social.create.action";
import {
  useState,
  useEffect,
  useTransition,
  memo,
  Dispatch,
  SetStateAction,
} from "react";
import { SocialMediaTypes } from "@prisma/client";
import { getSocialByType } from "./get-social";
import { deleteSocial } from "@/lib/actions/socialMedias/social.delete.action";
import { AtSign, Instagram, Youtube } from "lucide-react";
import Facebook from "../website/svg/facebook.svg";
import Twitter from "../website/svg/twitter.svg";
import Tiktok from "../website/svg/tiktok.svg";

export default function CreateSocialForm() {
  const [isPending, start] = useTransition();
  const [value, setValue] = useState<Set<SocialMediaTypes>>(new Set());
  const [textareaValue, setTextareaValue] = useState<string>("");
  const router = useRouter();
  const [socialExist, setSocialExist] = useState<boolean>(false);

  useEffect(() => {
    const [firstItem] = Array.from(value);
    if (firstItem) {
      start(async () => {
        try {
          const social = await getSocialByType(firstItem);
          if ("error" in social) {
            setTextareaValue("");
            setSocialExist(false);
            console.error(social.error);
          } else {
            setTextareaValue(social.handle as string);
            setSocialExist(true);
          }
        } catch (error: any) {
          toast.error(error);
        }
      });
    } else {
      setSocialExist(false);
    }
    router.refresh();
  }, [router, value]);

  return (
    <form
      action={async (data: FormData) =>
        await createSocial(data).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            router.refresh();
            setSocialExist(true);
            toast.success(`Proposta salva com sucesso!`);
          }
        })
      }
      className="space-y-4"
    >
      <div className="flex flex-row gap-4">
        <Input
          name="socialMediaName"
          variant="bordered"
          radius="md"
          isRequired
          label="Nome de usuário"
          placeholder="@nomedeusuario"
          onValueChange={setTextareaValue}
          endContent={<AtSign />}
          classNames={{
            innerWrapper: "justify-center",
          }}
        />
        <Select
          className="max-w-xs"
          name="socialMedia"
          label="Rede Social"
          selectedKeys={value}
          onSelectionChange={setValue as any}
        >
          <SelectItem key="instagram" startContent={<Instagram />}>
            Instagram
          </SelectItem>
          <SelectItem key="facebook" startContent={<Facebook />}>
            Facebook
          </SelectItem>
          <SelectItem key="twitter" startContent={<Twitter />}>
            X
          </SelectItem>
          <SelectItem key="tiktok" startContent={<Tiktok />}>
            Tiktok
          </SelectItem>
          <SelectItem key="youtube" startContent={<Youtube />}>
            Youtube
          </SelectItem>
        </Select>
      </div>

      <div className="space-x-4">
        <FormButton isEmpty={!textareaValue} />
        {socialExist && (
          <ConfirmDeletesocialModal
            type={value}
            setSocialExist={setSocialExist}
            setTextareaValue={setTextareaValue}
          />
        )}
      </div>
    </form>
  );
}

export const ConfirmDeletesocialModal = memo(function ConfirmDeletesocialModal({
  type,
  setSocialExist,
  setTextareaValue,
}: {
  type: Set<SocialMediaTypes>;
  setSocialExist: Dispatch<SetStateAction<boolean>>;
  setTextareaValue: Dispatch<SetStateAction<string>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const handleDeletePress = async (onClose: () => void) => {
    try {
      const [uniqueItem] = Array.from(type);
      await deleteSocial(uniqueItem);
      setSocialExist(false);
      setTextareaValue("");
      router.refresh();
      toast.success("Proposta deletada com sucesso.");
    } catch (error: any) {
      toast.error(error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="bordered"
        color="danger"
        radius="sm"
        className="h-8 w-32 border-danger-100 hover:border-danger-300 focus:outline-none sm:h-10"
        onPress={onOpen}
      >
        Excluir
      </Button>
      <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-300">
                Deletar
              </ModalHeader>
              <ModalBody>
                <p className="text-gray-400">
                  Tem certeza que quer deletar esta proposta?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => handleDeletePress(onClose)}
                >
                  Sim
                </Button>
                <Button color="primary" onPress={onClose}>
                  Não
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
});
