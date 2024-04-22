import UsersTable from "@/components/table/users.table";
import { getSession } from "@/lib/auth/get-session";
import { Bold } from "@tremor/react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import prisma from "@/lib/configs/prisma";

export const metadata: Metadata = {
  title: "Usuários",
};
export default async function Page() {
const session = await getSession()

if(!session) {
  redirect('/')
}

const getAdmins = async () => {
  "use server"

  const admins = await prisma.admin.findMany({
    include: {
      user: true
    }
  })

  return admins
}

const admins = await getAdmins()

  return (
    <div className="w-full">
      <h1 className="font-cal m-0 mb-2 text-xl font-bold dark:text-white sm:text-3xl">
        Usuários
      </h1>
      <UsersTable admins={admins} />
    </div>
  );
}
