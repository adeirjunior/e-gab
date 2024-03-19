"use client";

import { Select, SelectItem, Skeleton } from "@nextui-org/react";
import useSWR from "swr";

type PartyDataType = {
  id: string;
  sigla: string;
  nome: string;
  uri: string;
};

type PartiesDataType = {
  dados: PartyDataType[];
  links: {
    rel: string;
    href: string;
  }[];
};

async function getParties(url: string): Promise<PartyDataType[]> {
  const res: Response = await fetch(
    `https://dadosabertos.camara.leg.br/api/v2${url}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { dados } = (await res.json()) as PartiesDataType;

  console.log(dados);

  return dados;
}

export default function SelectParties() {
  const { data, error, isLoading } = useSWR(
    "/partidos?ordem=ASC&ordenarPor=sigla",
    getParties,
  );

  if (isLoading)
    return (
      <Skeleton className="w-full max-w-xs rounded-xl">
        <Select
          variant="bordered"
          disabled
          label="Um erro ocorreu"
          className="max-w-xs"
        >
          <SelectItem key="1" value="Vazio">
            Vazio
          </SelectItem>
        </Select>
      </Skeleton>
    );
  if (error)
    return (
      <Select
        variant="bordered"
        disabled
        label="Um erro ocorreu"
        className="max-w-xs"
      >
        <SelectItem key="1" value="Vazio">
          Vazio
        </SelectItem>
      </Select>
    );
  if (!data) return "Dados vazios.";

  return (
    <Select variant="bordered" label="Escolha seu partido" className="max-w-xs">
      {data.map((party) => (
        <SelectItem key={party.id} value={party.sigla}>
          {party.sigla}
        </SelectItem>
      ))}
    </Select>
  );
}
