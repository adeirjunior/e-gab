import { Metadata } from "next";
import prisma from "@/lib/configs/prisma";
import { getSiteData } from "@/lib/fetchers/site";
import StandardGoogleMap from "@/components/maps/standard-google-map";
import { Card, Link } from "@nextui-org/react";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  YoutubeIcon,
} from "lucide-react";
import Tiktok from "@/components/website/svg/tiktok.svg";
import Twitter from "@/components/website/svg/twitter.svg";
import { RiWhatsappLine } from "@remixicon/react";

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
      location: true,
    },
  });

  const medias = await prisma.socialMedia.findMany({
    where: {
      websiteId: website?.id,
    },
  });

  return (
    <div className="flex flex-col justify-center gap-6 px-6">
      <section className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-semibold">Contato</h2>
        <Card
          className="flex flex-row gap-4 p-2"
          isPressable
          as={Link}
          href={`mailto:${contact?.email}`}
        >
          <div>
            <MailIcon />
          </div>
          <div>
            <h3 className="text-sm font-semibold">EMAIL</h3>
            <p className="text-[#DD5471]">{contact?.email}</p>
          </div>
        </Card>
        <Card
          className="flex flex-row gap-4 p-2"
          isPressable
          as={Link}
          href={`tel:${contact?.phone}`}
        >
          <div>
            <PhoneIcon />
          </div>
          <div>
            <h3 className="text-sm font-semibold ">TELEFONE</h3>
            <p className="text-[#DD5471]">{contact?.phone}</p>
          </div>
        </Card>
        <Card
          className="flex flex-row gap-4 p-2"
          isPressable
          as={Link}
          href={`tel:${contact?.phone}`}
        >
          <div>
            <RiWhatsappLine />
          </div>
          <div>
            <h3 className="text-sm font-semibold">WHATSAPP</h3>
            <p className="text-[#DD5471]">{contact?.phone}</p>
          </div>
        </Card>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-semibold">Redes Sociais</h2>
        {medias.map((media, index) => (
          <Card
            className="flex flex-row gap-4 p-2"
            isPressable
            as={Link}
            target={media.type}
            href={
              media.type === "facebook"
                ? `https://facebook.com/${media.handle}`
                : media.type === "twitter"
                  ? `https://x.com/${media.handle}`
                  : media.type === "instagram"
                    ? `https://instagram.com/${media.handle}`
                    : media.type === "tiktok"
                      ? `https://tiktok.com/@${media.handle}`
                      : media.type === "youtube"
                        ? `https://youtube.com/@${media.handle}`
                        : ""
            }
            key={index}
          >
            <div>
              {media.type === "youtube" ? (
                <YoutubeIcon />
              ) : media.type === "facebook" ? (
                <FacebookIcon />
              ) : media.type === "instagram" ? (
                <InstagramIcon />
              ) : media.type === "tiktok" ? (
                <Tiktok />
              ) : (
                <Twitter />
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold">
                {media.type?.toString().toUpperCase()}
              </h3>
              <p className="text-[#DD5471]">{media.handle}</p>
            </div>
          </Card>
        ))}
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-semibold">Endereço</h2>
        <StandardGoogleMap location={contact?.location!} />
      </section>
    </div>
  );
}
