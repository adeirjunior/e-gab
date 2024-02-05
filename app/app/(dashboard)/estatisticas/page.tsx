import { hasSubscription } from "@/lib/helpers/billing";
import OnboardingExample from "@/components/onboarding";
import ButtonC from "./button";

export default async function page() {
  const hasSub = await hasSubscription()
  return (
    <div className="p-8">
      <h1 className="m-0 mb-2 font-cal text-xl font-bold sm:text-3xl dark:text-white">
        Estatísticas
      </h1>
      <OnboardingExample />
      <ButtonC hasSub={hasSub} />
    </div>
  );
}
