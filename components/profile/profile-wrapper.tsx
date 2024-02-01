import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import Profile from "@/components/profile/profile";

export default async function ProfileWrapper() {
  
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  return (<Profile user={session.user} />)
}
