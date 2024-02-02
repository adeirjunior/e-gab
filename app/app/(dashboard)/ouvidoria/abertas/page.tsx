
import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getCurrentDomain } from "@/lib/utils";
import { Button, Card, Input, Link } from "@nextui-org/react";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getSession()

  if(!session?.user) {
    return redirect('/')
  }

  const website = await getWebsiteByUserId(session.user.id)

  const rooms = await prisma.chatRoom.findMany({
    where: {
      websiteId: website?.id
    },
    include: {
      client: {
        select: {
          user: {
            select: {
              email: true,
              name: true
            }
          }
        }
      }
    }
  })

  return (
    <Card className="space-y-6 bg-transparent p-6">
      {rooms.map((room) => (
        <Card key={room.id}>
          <h3>Sala de {room.client.user?.name || room.client.user?.email}</h3>
          <Button as={Link} href={getCurrentDomain("app", `/ouvidoria/abertas/${room.id}`)}>
            Entrar
          </Button>
        </Card>
      ))}
    </Card>
  );
};

export default Page;
