import { Metadata } from "next";
import prisma from "@/lib/configs/prisma";
import { getSiteData } from "@/lib/fetchers/site";
import StandardGoogleMap from "@/components/maps/standard-google-map";

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
      id: website?.contactId ?? undefined,
    },
    include: {
      location: true
    }
  });

  return (
    <section>
      <h1>Contato</h1>
      <p>{contact?.email}</p>
      <p>{contact?.phone}</p>
      <StandardGoogleMap location={contact?.location!} />
    </section>
  );
}
