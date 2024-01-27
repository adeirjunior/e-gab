/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState } from "react";
import { Proposals } from "@prisma/client";
import { Select, SelectItem, Textarea } from "@nextui-org/react";
import TextareaAutosize from "react-textarea-autosize";

export type ProposalsWithSite = Proposals & {
  website: { subdomain: string | null };
};

export default function Page({ proposals }: { proposals: ProposalsWithSite }) {
  const [data, setData] = useState<ProposalsWithSite>(proposals);

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg dark:border-stone-700">
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
        <Select
          variant="bordered"
          label="Selecione uma proposta"
          className="dark:placeholder-text-600 border-none px-0 font-cal text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-gray-400"
          classNames={{ listbox: "p-0", listboxWrapper: "p-0" }}
        >
          <SelectItem
            classNames={{ title: "text-gray-400" }}
            variant="bordered"
            key="1"
            value="health"
          >
            Saúde
          </SelectItem>
          <SelectItem
            classNames={{ title: "text-gray-400" }}
            variant="bordered"
            key="2"
            value="education"
          >
            Educação
          </SelectItem>
          <SelectItem
            classNames={{ title: "text-gray-400" }}
            variant="bordered"
            key="3"
            value="security"
          >
            Segurança
          </SelectItem>
          <SelectItem
            classNames={{ title: "text-gray-400" }}
            variant="bordered"
            key="4"
            value="infrastructure"
          >
            Insfraestrutura
          </SelectItem>
        </Select>
        <Textarea
          key=""
          variant="bordered"
          label="Descrição"
          labelPlacement="outside"
          placeholder="Entre a descrição do seu projeto"
          className="col-span-12 mb-6 w-full p-0 md:col-span-6 md:mb-0"
          classNames={{
            innerWrapper: "min-h-96",
            input: "text-gray-400",
          }}
        />
      </div>
    </div>
  );
}
