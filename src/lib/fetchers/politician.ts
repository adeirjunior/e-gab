"use server";

import { unstable_cache } from "next/cache";
import prisma from "../configs/prisma";

export async function getPoliticianDataByDomain(domain: string) {
  if (!domain) {
    // Trate o caso em que domain é undefined
    console.error("O parâmetro 'domain' não pode ser undefined.");
    return null; // ou lançar uma exceção, dependendo do seu caso
  }

  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  const website = await prisma.website.findUnique({
    where: subdomain ? { subdomain } : { customDomain: domain },
  });

if (!website) {
  // Trate o caso em que domain é undefined
  console.error("O parâmetro 'website' não pode ser undefined.");
  return null; // ou lançar uma exceção, dependendo do seu caso
}

  return await unstable_cache(
    async () => {
      return prisma.politician.findUnique({
        where: {
          id: website.politicianId,
        },
        include: {
          user: true,
        },
      });
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}
