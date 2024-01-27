"use client";

import { Select, SelectItem, Textarea } from "@nextui-org/react";
import { FormButton } from ".";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProposal } from "@/lib/actions/proposals/proposals.create.action";

export default function CreateProposalForm() {
  const router = useRouter();
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
          classNames={{
            innerWrapper: "min-h-[150px]",
            input: "text-gray-400",
          }}
        />
      </div>
      <FormButton />
    </form>
  );
}
