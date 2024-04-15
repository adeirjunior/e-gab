"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { FormButton } from ".";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProposal } from "@/lib/actions/proposals/proposals.create.action";
import {
  useState,
  useEffect,
  useTransition,
  memo,
  Dispatch,
  SetStateAction,
} from "react";
import { ProposalTypes } from "@prisma/client";
import { getProposalByType } from "./get-proposal";
import { deleteProposal } from "@/lib/actions/proposals/proposals.delete.action";
import { updateProposal } from "@/lib/actions/proposals/proposals.update.action";

export default function CreateProposalForm() {
  const [isPending, start] = useTransition();
  const [value, setValue] = useState<Set<ProposalTypes>>(new Set());
  const [textareaValue, setTextareaValue] = useState<string>("");
  const router = useRouter();
  const [proposalExist, setProposalExist] = useState<boolean>(false);

  useEffect(() => {
    const [firstItem] = Array.from(value);
    if (firstItem) {
      start(async () => {
        try {
          const proposal = await getProposalByType(firstItem);
          if ("error" in proposal) {
            setTextareaValue("");
            setProposalExist(false);
            console.error(proposal.error);
          } else {
            setTextareaValue(proposal.description);
            setProposalExist(true);
          }
        } catch (error: any) {
          toast.error(error);
        }
      });
    } else {
      setProposalExist(false);
    }
    router.refresh();
  }, [router, value]);

  return (
    <form
      action={async (data: FormData) =>{
        const type = data.get("type") as ProposalTypes;

        const prosposal = await getProposalByType(type);

        if(prosposal) {
          await updateProposal(data).then((res: any) => {
            if (res.error) {
              toast.error(res.error);
            } else {
              router.refresh();
              setProposalExist(true);
              toast.success(`Proposta salva com sucesso!`);
            }
          });
        } else {
          await createProposal(data).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            router.refresh();
            setProposalExist(true);
            toast.success(`Proposta salva com sucesso!`);
          }
        })
        }
        }
      }
      className="relative w-full border-stone-200 dark:border-stone-700 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:p-8 sm:px-12 sm:shadow-lg"
    >
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 dark:border-stone-700">
        <Select
          required
          name="type"
          variant="bordered"
          label="Selecione uma proposta"
          className="dark:placeholder-text-600 font-cal border-none px-0 text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-gray-400"
          selectedKeys={value}
          onSelectionChange={setValue as any}
          classNames={{ listbox: "p-0", listboxWrapper: "p-0" }}
        >
          <SelectItem
            classNames={{ title: "text-gray-400" }}
            variant="bordered"
            key="health"
            value="health"
          >
            Saúde
          </SelectItem>
          <SelectItem
            classNames={{ title: "text-gray-400" }}
            variant="bordered"
            key="education"
            value="education"
          >
            Educação
          </SelectItem>
          <SelectItem
            classNames={{ title: "text-gray-400" }}
            variant="bordered"
            key="security"
            value="security"
          >
            Segurança
          </SelectItem>
          <SelectItem
            classNames={{ title: "text-gray-400" }}
            variant="bordered"
            key="infrastructure"
            value="infrastructure"
          >
            Insfraestrutura
          </SelectItem>
        </Select>
        <Textarea
          required
          isDisabled={value.size === 0}
          name="description"
          key=""
          variant="bordered"
          label="Descrição"
          labelPlacement="outside"
          placeholder="Entre a descrição do seu projeto"
          className="col-span-12 mb-6 w-full p-0 md:col-span-6 md:mb-0"
          value={textareaValue}
          onValueChange={setTextareaValue}
          classNames={{
            innerWrapper: "min-h-[150px]",
            input: "text-gray-400",
          }}
        />
      </div>

      <div className="space-x-4">
        <FormButton isEmpty={!textareaValue} />
        {proposalExist && (
          <ConfirmDeleteProposalModal
            type={value}
            setProposalExist={setProposalExist}
            setTextareaValue={setTextareaValue}
          />
        )}
      </div>
    </form>
  );
}

export const ConfirmDeleteProposalModal = memo(
  function ConfirmDeleteProposalModal({
    type,
    setProposalExist,
    setTextareaValue,
  }: {
    type: Set<ProposalTypes>;
    setProposalExist: Dispatch<SetStateAction<boolean>>;
    setTextareaValue: Dispatch<SetStateAction<string>>;
  }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    const handleDeletePress = async (onClose: () => void) => {
      try {
        const [uniqueItem] = Array.from(type);
        await deleteProposal(uniqueItem);
        setProposalExist(false);
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
  },
);
