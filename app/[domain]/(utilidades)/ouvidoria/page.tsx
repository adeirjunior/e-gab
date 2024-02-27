import { getSession } from "@/lib/auth/get-session";
import { getWebsiteBySubdomain } from "@/lib/fetchers/site";
import { cn, getCurrentDomain } from "@/lib/utils";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Link,
  Skeleton,
} from "@nextui-org/react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Bold, Grid, Text, Title } from "@tremor/react";
import FormModal from "./form-modal";
import { getRoomsByUser } from "@/lib/fetchers/room";
import { getClientByUser } from "@/lib/fetchers/user";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import DemandsTable from "../../../app/(dashboard)/ouvidoria/demands-table";

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

  const rooms = await getRoomsByUser(website.id, session.user.id);

  if (!rooms) {
    console.error("Erro ao encontrar salas.");
    return null;
  }

  return (
    <div className="min-h-screen space-y-6 bg-transparent">
      <FormModal rooms={rooms} subdomain={subdomain!} />
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
                  : room.status === "denied"
                    ? "Negado"
                    : room.status === "accepted"
                      ? "Pedido Aceito"
                      : "Outro";

            return (
              <Card shadow="md" className="w-96 border-3" key={room.id}>
                <CardHeader>
                  <div className="flex w-full items-center justify-between">
                    <Title>{room.title}</Title>
                    <Chip
                      color={
                        room.status === "denied"
                          ? "danger"
                          : room.status === "accepted"
                            ? "success"
                            : "primary"
                      }
                    >
                      {status}
                    </Chip>
                  </div>
                </CardHeader>
                <CardBody>
                  {room.status === "denied" && (
                    <>
                      {" "}
                      <Bold>Resposta:</Bold>
                      <Text>{room.reason ? room.reason : ""}</Text>
                    </>
                  )}
                  {room.status === "accepted" && (
                    <>
                      <Bold>Estimativa de entrega:</Bold>
                      {room.acceptedRequest && (
                        <Text>
                          Será entregue entre{" "}
                          {format(room.acceptedRequest.from, "PPP", {
                            locale: ptBR,
                          })}{" "}
                          e{" "}
                          {format(room.acceptedRequest.to!, "PPP", {
                            locale: ptBR,
                          })}
                        </Text>
                      )}
                    </>
                  )}
                </CardBody>
                <CardFooter>
                  {room.status === "disabled" ||
                  room.status === "pending" ||
                  room.status === "denied" ? (
                    <Skeleton className="rounded-full">
                      <Button disabled>Entrar</Button>
                    </Skeleton>
                  ) : (
                    <Button
                      as={Link}
                      href={getCurrentDomain(
                        subdomain!,
                        `/ouvidoria/${room.id}`,
                      )}
                      variant="flat"
                    >
                      {room.status === "accepted" ? "Ver histórico" : "Entrar"}
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
    </div>
  );
}
