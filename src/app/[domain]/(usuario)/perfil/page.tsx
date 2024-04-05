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

  const user = await getUserById(session.user.id)

  return (
    <div className="min-h-screen space-y-4">
      <Card className="min-h-96 w-full rounded-xl bg-gray-600"></Card>
      <div className="flex gap-4 justify-between ">
        <div className="flex gap-4">
           <Card className="-mt-20 ml-6 rounded-full">
          <ClientProfile alt="Imagem de perfil" src={user.image} />
        </Card>
        <h2 className="my-4 text-2xl font-semibold">{user.name}</h2>
        </div>
       <Card className="max-w-60 border-3 p-4 w-full">
        <Title>Nível</Title>
        <p className="text-2xl font-extrabold">{user.client?.level}</p>
        <Progress
          label="Exp"
          showValueLabel
          color="warning"
          aria-label="Loading..."
          value={user.client?.exp}
          formatOptions={{ style: "decimal"}}
        />
      </Card>
    </div>
      </div>
      
  );
}
