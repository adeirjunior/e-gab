import ClientProfile from "@/components/profile/client-profile";
import { getSession } from "@/lib/auth/get-session";
import { getUserById } from "@/lib/fetchers/user";
import { Card, Progress } from "@nextui-org/react";
import { Bold, Text, Title } from "@tremor/react";
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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Card className="-mt-20 mx-auto sm:ml-6 rounded-full w-fit h-fit">
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
    </div>
  );
}
