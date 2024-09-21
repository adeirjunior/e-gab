import { Suspense } from "react";
import Posts from "@/components/content/posts";
import PlaceholderCard from "@/components/card/placeholder-card";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import AnalyticsMockup from "@/components/stats/analytics";

export default async function Overview() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const data = await getWebsiteByUserId(session.user.id);

  if (!data) {
    throw new Error("Dados não encontrados.");
  }
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Visão Geral
        </h1>
        <AnalyticsMockup />
      </div>

      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Posts Recentes
        </h1>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <Posts websiteId={data.id} limit={4} />
        </Suspense>
      </div>
    </div>
  );
}
