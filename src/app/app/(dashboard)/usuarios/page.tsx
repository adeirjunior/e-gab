import UsersTable from "@/components/table/users.table";
import { getSession } from "@/lib/auth/get-session";
import { Bold } from "@tremor/react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Usuários",
};
export default async function Page() {
const session = await getSession()

if(!session) {
  redirect('/')
}

  return (
    <div className="p-8">
      <h1 className="font-cal m-0 mb-2 text-xl font-bold dark:text-white sm:text-3xl">
        Usuários
      </h1>
      <Bold>Você é um {session.user.role === 'politician' ? "Político" : "Usuário"}</Bold>
      <UsersTable />
    </div>
  );
}
