import { createChatRoom } from "@/lib/actions/chatRoom/chatRoom.create.action";
import { getSession } from "@/lib/auth/get-session";
import { getWebsiteBySubdomain } from "@/lib/fetchers/site";
import { getCurrentDomain } from "@/lib/utils";
import { Button, Card, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import prisma from "@/lib/configs/prisma";
import { Grid, Title } from "@tremor/react";
import FormModal from "./form-modal";

export const metadata: Metadata = {
  title: "Ouvidoria",
};

export default async function Page({ params }: { params: { domain: string } }) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const domain = decodeURIComponent(params.domain);

  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  const website = await getWebsiteBySubdomain(subdomain!);

  const client = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!website || !client) {
    console.error("Site não encontrado.");
    return null;
  }

  const rooms = await prisma.chatRoom.findMany({
    where: {
      websiteId: website.id,
    },
  });

  if (!rooms) {
    console.error("Erro ao encontrar salas.");
    return null;
  }

  const createRoom = async (formData: FormData) => {
    "use server";

    const response = await createChatRoom(client.clientId!, website.id!, formData);

    if ("error" in response) {
      console.error(response.error);
      return null;
    }

    return redirect(getCurrentDomain(subdomain!, `/ouvidoria/${response.id}`));
  };

  return (
    <Card className="space-y-6 bg-transparent p-6">
      <Grid numItems={1} numItemsSm={2} numItemsMd={3} numItemsLg={4}>
        {rooms.map((room) => (
          <Card shadow="md" key={room.id}>
            <Title>Sala</Title>
            <Button
              as={Link}
              href={getCurrentDomain(subdomain!, `/ouvidoria/${room.id}`)}
            >
              Entrar
            </Button>
          </Card>
        ))}
      </Grid>

      <form action={createRoom}>
        <FormModal subdomain={subdomain}/>
      </form>
    </Card>
  );
}
