import { getSession } from "@/lib/auth/get-session";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ouvidoria",
};

export default async function Page() {
  const session = await getSession();

  if(!session?.user){
    redirect("/login")
  }

  return <div>page</div>;
}
