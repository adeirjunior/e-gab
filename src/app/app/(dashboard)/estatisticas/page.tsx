import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { ReportResponse } from "@/lib/types/types";
import { Suspense } from "react";
import { getCurrentDomain } from "@/lib/utils";
import Visits from "./visits";
import AnalyticsMockup from "@/components/stats/analytics";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const response = await fetch(`${getCurrentDomain()}/api/analytics`);
  const reportData: ReportResponse = await response.json();

  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="font-cal m-0 mb-2 text-xl font-bold dark:text-white sm:text-3xl">
        Estatísticas
      </h1>
      <AnalyticsMockup />
      <Suspense fallback={<p>Carregando...</p>}>
        <Visits reportData={reportData} />
      </Suspense>
    </div>
  );
}
