import UsersTable from "@/components/table/users.table";
import { Metadata } from "next";

export const metadata: Metadata = {
title: "Leis"
}
export default function Page() {
  return (
    <UsersTable />
  )
}