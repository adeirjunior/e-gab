import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import OverviewStats from "@/components/stats/overview-stats";
import { AnalyticsReport } from "@/lib/types/types";
import { Suspense } from "react";
import { getCurrentDomain } from "@/lib/utils";

export default async function page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const response = await fetch(`${getCurrentDomain()}/api/analytics`);
  const result: AnalyticsReport = await response.json();

  return (
    <div className="p-8">
      <h1 className="font-cal m-0 mb-2 text-xl font-bold dark:text-white sm:text-3xl">
        Estatísticas
      </h1>
      <Suspense fallback={<p>Carregando...</p>}>
        {result?.rows.map((row, index) => (
          <div key={index}>
            <div>
              <strong>Dimensões:</strong> {row.dimensionValues.map((dimValue, dimIndex) => (
                <span key={dimIndex}>{dimValue.value} (One Value: {dimValue.oneValue})</span>
              ))}
            </div>
            <div>
              <strong>Métricas:</strong> {row.metricValues.map((metricValue, metricIndex) => (
                <span key={metricIndex}>{metricValue.value} (One Value: {metricValue.oneValue})</span>
              ))}
            </div>
          </div>
        ))}
      </Suspense>
      <OverviewStats />
    </div>
  );
}
