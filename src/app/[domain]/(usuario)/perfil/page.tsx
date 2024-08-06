import ClientProfile from "@/components/profile/client-profile";
import { getSession } from "@/lib/auth/get-session";
import { getUserById } from "@/lib/fetchers/user";
import { Card, CardHeader, Link, Progress } from "@nextui-org/react";
import { Title } from "@tremor/react";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await getUserById(session.user.id);

  return (
    <div className="min-h-screen space-y-4">
      <Card className="min-h-96 w-full rounded-xl bg-gray-600"></Card>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Card className="mx-auto -mt-20 h-fit w-fit rounded-full sm:ml-6">
            <ClientProfile alt="Imagem de perfil" src={user.image} />
          </Card>
          <h2 className="my-4 text-2xl font-semibold">{user.name}</h2>
        </div>
        <Card className="w-full max-w-60 border-3 p-4">
          <Title>Nível</Title>
          <p className="text-2xl font-extrabold">{user.client?.level}</p>
          <Progress
            label="Exp"
            showValueLabel
            color="warning"
            aria-label="Loading..."
            value={user.client?.exp}
            maxValue={user.client?.maxExp}
            formatOptions={{ style: "decimal" }}
          />
        </Card>
      </div>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Informações</h2>
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Eventos Inscritos</h3>
          {user.subscriptedEvents.map((event, index) => (
            <Card
              className="border"
              as={Link}
              href={`/eventos/${event.slug}`}
              key={index}
            >
              <CardHeader>{event.title}</CardHeader>
            </Card>
          ))}
        </section>
      </section>
    </div>
  );
}
