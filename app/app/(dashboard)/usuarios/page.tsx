import UsersTable from "@/components/table/users.table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuários",
};
export default function Page() {
  return (
    <div className="p-8">
      <h1 className="m-0 font-cal text-xl font-bold sm:text-3xl dark:text-white mb-2">
        Usuários
      </h1>
      <UsersTable />
    </div>
  );
}
