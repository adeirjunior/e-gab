import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import OverviewStats from "@/components/stats/overview-stats";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  

  return (
    <div className="p-8">
      <h1 className="font-cal m-0 mb-2 text-xl font-bold dark:text-white sm:text-3xl">
        Estatísticas
      </h1>
      <OverviewStats />
    </div>
  );
}
