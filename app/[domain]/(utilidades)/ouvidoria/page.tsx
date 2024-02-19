import { getSession } from "@/lib/auth/get-session";
import { getWebsiteBySubdomain } from "@/lib/fetchers/site";
import { getCurrentDomain } from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Link,
} from "@nextui-org/react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Grid, Title } from "@tremor/react";
import FormModal from "./form-modal";
import { getRooms } from "@/lib/fetchers/room";
import { getClientByUser } from "@/lib/fetchers/user";

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

  const client = await getClientByUser(session.user.id);

  if (!website || !client) {
    console.error("Site não encontrado.");
    return null;
  }

  const rooms = await getRooms(website.id);

  if (!rooms) {
    console.error("Erro ao encontrar salas.");
    return null;
  }

  return (
    <Card className="min-h-screen space-y-6 bg-transparent p-6">
      <FormModal subdomain={subdomain} />
      <Divider />
      {rooms.length > 0 ? (
        <Grid
          numItems={1}
          numItemsSm={2}
          numItemsMd={3}
          numItemsLg={4}
          className="gap-4"
        >
          {rooms.map((room) => {
            const status =
              room.status === "pending"
                ? "Solicitado"
                : room.status === "active"
                  ? "Ativo"
                  : "Outro";

            return (
              <Card shadow="md" className="border-3" key={room.id}>
                <CardHeader>
                  <div className="flex w-full items-center justify-between">
                    <Title>{room.title}</Title>
                    <Chip color="primary">{status}</Chip>
                  </div>
                </CardHeader>
                <CardBody></CardBody>
                <CardFooter>
                  {room.status === "disabled" ||
                  room.status === "pending" ||
                  room.status === "denied" ? (
                    <Button disabled variant="flat">
                      Entrar
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      href={getCurrentDomain(
                        subdomain!,
                        `/ouvidoria/${room.id}`,
                      )}
                      variant="flat"
                    >
                      Entrar
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </Grid>
      ) : (
        <Title>Não possui salas</Title>
      )}
    </Card>
  );
}
