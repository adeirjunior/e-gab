import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AnalyticsMockup from "@/components/analytics";

export default async function SiteAnalytics() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }



  return (
    <>
      <div className="flex items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="font-cal text-xl font-bold dark:text-white sm:text-3xl">
            Analytics for Website
          </h1>
          </div>
          </div>
      <AnalyticsMockup />
    </>
  );
}
