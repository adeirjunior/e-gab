"use server";

import { PartiesDataType, PartyDataType } from "../types/types";

export async function getAllParties(url: string): Promise<PartyDataType[]> {
  const res: Response = await fetch(
    `https://dadosabertos.camara.leg.br/api/v2${url}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  let data: PartyDataType[] = [];

  const { links, dados } = (await res.json()) as PartiesDataType;

  const dsdPromises = links.map(async (link) => {
    if (link.rel === "next") {
      const res: Response = await fetch(link.href);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const { dados: dados2 } = (await res.json()) as PartiesDataType;

      return dados2;
    }
    return []
  });

  const dsd = await Promise.all(dsdPromises);

  data = [...dados, ...dsd.flat()];

  return data;
}
