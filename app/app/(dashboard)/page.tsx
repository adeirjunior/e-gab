import { Suspense } from "react";
import OverviewStats from "@/components/stats/overview-stats";
import Posts from "@/components/posts";
import PlaceholderCard from "@/components/card/placeholder-card";

export default function Overview() {
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Visão Geral
        </h1>
        <OverviewStats />
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Top Sites
          </h1>
        </div>
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
          <Posts limit={4} />
        </Suspense>
      </div>
    </div>
  );
}
