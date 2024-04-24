"use client";

import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { getAllParties } from "@/lib/fetchers/party";
import { Select, SelectItem, Skeleton } from "@nextui-org/react";
import useSWR from "swr";

export default function SelectParties() {
  const { data, error, isLoading } = useSWR(
    "/partidos?ordem=ASC&ordenarPor=sigla",
    getAllParties,
  );

  const { politicianParty, setPoliticianParty } = useNewUserSteps();

  if (isLoading)
    return (
      <Skeleton className="w-full max-w-xs rounded-xl">
        <Select
          variant="bordered"
          disabled
          label="Carregando"
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
    <>
      <Select
        value={politicianParty}
        onChange={(e) => {
          const selected = data.filter(
            (party) => party.id == e.target.value,
          )[0];
          setPoliticianParty(selected.sigla);
        }}
        variant="bordered"
        label="Escolha seu partido"
        className="max-w-xs"
      >
        {data.map((party) => (
          <SelectItem key={party.id} value={party.sigla}>
            {party.sigla}
          </SelectItem>
        ))}
      </Select>
    </>
  );
}
