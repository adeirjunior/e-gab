import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getCurrentDomain } from "@/lib/utils";
import { Button, Card, Input, Link } from "@nextui-org/react";
import { Grid } from "@tremor/react";
import { redirect } from "next/navigation";
import ActionsDropDown from "./[roomId]/actions-dropdown";

const Page = async () => {
  const session = await getSession();

  if (!session?.user) {
    return redirect("/");
  }

  const website = await getWebsiteByUserId(session.user.id);

  const rooms = await prisma.chatRoom.findMany({
    where: {
      websiteId: website?.id,
      status: "active",
    },
    include: {
      client: {
        select: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    <Card className="space-y-6 bg-transparent p-6">
      {rooms.length > 0 ? (
        <Grid numItems={2} numItemsMd={3} numItemsLg={4}>
          {rooms.map((room) => (
            <Card key={room.id}>
              <div className="flex flex-row justify-between">
                <h3>
                  Sala de {room.client.user?.name || room.client.user?.email}
                </h3>{" "}
                <ActionsDropDown id={room.id} />
              </div>
              <Button
                as={Link}
                href={getCurrentDomain("app", `/ouvidoria/abertas/${room.id}`)}
              >
                Entrar
              </Button>
            </Card>
          ))}
        </Grid>
      ) : (
        "Sem salas abertas"
      )}
    </Card>
  );
};

export default Page;
