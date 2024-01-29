"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { FormButton } from ".";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProposal } from "@/lib/actions/proposals/proposals.create.action";
import { useState, useEffect, useTransition } from "react";
import { ProposalTypes } from "@prisma/client";
import { getProposalByType } from "./get-proposal";
import { cn } from "@/lib/utils";

export default function CreateProposalForm() {
  const [isPending, start] = useTransition();
  const [value, setValue] = useState<any>([]);
  const [textareaValue, setTextareaValue] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const arrayFromSet = Array.from(value);
    if (arrayFromSet.length > 0) {
      const firstItem = arrayFromSet[0] as ProposalTypes;

      try {
        start(async () => {
          const proposal = await getProposalByType(firstItem);
          setTextareaValue(proposal.description);
        });
      } catch (error: any) {
        toast.error(error);
      }
    } else {
      console.log("O conjunto está vazio.");
    }
  }, [value]);

  return (
    <form
      action={async (data: FormData) =>
        await createProposal(data).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            router.refresh();
            toast.success(`Proposta salva com sucesso!`);
          }
        })
      }
      className="relative w-full border-stone-200 p-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg dark:border-stone-700"
    >
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 dark:border-stone-700">
        <Select
          required
          name="type"
          variant="bordered"
          label="Selecione uma proposta"
          className="dark:placeholder-text-600 border-none px-0 font-cal text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-gray-400"
          selectedKeys={value}
          onSelectionChange={setValue}
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
        <FormButton isEmpty={!textareaValue}/>
      {textareaValue && <ConfirmDeleteProposalModal />}
      </div>
      
    </form>
  );
}


export async function ConfirmDeleteProposalModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return <>
   <Button
        type="button"
        variant="bordered"
        color="danger"
        radius="sm"
        className="h-8 w-32 focus:outline-none sm:h-10 hover:text-danger-200"
        onPress={onOpen}
      >
        Excluir
      </Button>
    <Modal
      isOpen={isOpen}
      placement="auto"
      onOpenChange={onOpenChange}
    >
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
              <Button color="danger" variant="light" onPress={onClose}>
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
}