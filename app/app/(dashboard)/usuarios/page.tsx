import UsersTable from "@/components/table/users.table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuários",
};
export default function Page() {
  return (
    <div className="p-8">
      <h1 className="font-cal m-0 mb-2 text-xl font-bold dark:text-white sm:text-3xl">
        Usuários
      </h1>
      <UsersTable />
    </div>
  );
}
