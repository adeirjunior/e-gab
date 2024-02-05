import { createCustomerIfNull, hasSubscription } from "@/lib/helpers/billing";
import Button from "./button";
import { getSession } from "@/lib/auth/get-session";

export default async function page() {
  const session = await getSession()
  const hasSub = await hasSubscription()
  return (
    <div className="p-8">
      <h1 className="m-0 mb-2 font-cal text-xl font-bold sm:text-3xl dark:text-white">
        Estatísticas
      </h1>
      <Button hasSub={hasSub} />
    </div>
  );
}
