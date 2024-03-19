import { Metadata } from "next";
import prisma from "@/lib/configs/prisma";
import { getSiteData } from "@/lib/fetchers/site";

export const metadata: Metadata = {
  title: "Bibliografia",
};

export default async function SiteContactPage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const website = await getSiteData(domain);
  const contact = await prisma.contact.findUnique({
    where: {
      id: website?.contactId,
    },
  });

  return (
    <div className="mb-20 w-full">
      <h1>Contato</h1>
      <p>{contact?.email}</p>
      <p>{contact?.phone}</p>
    </div>
  );
}
