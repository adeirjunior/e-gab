import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "@/lib/helpers/billing";
import { getCurrentDomain } from "@/lib/utils";
import { Button, Card, Chip, Link } from "@nextui-org/react";
import { MoveRight } from "lucide-react";
import React from "react";

export default async function CurrentActivePlanCard({
  plan,
  session,
}: {
  plan: string;
  session: any;
}) {
  const stripeCustomerId = await createCustomerIfNull(session) as string;

  const manage_link = await generateCustomerPortalLink(stripeCustomerId) as string;
  const checkout_link = await createCheckoutLink(stripeCustomerId) as string;

  const hasSub = await hasSubscription();

  return (
    <div className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black">
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="font-cal text-xl dark:text-white">Plano</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {hasSub ? (
            <>
              <span>Você esta usando o plano</span>{" "}
              <Chip size="sm">{plan}</Chip>
            </>
          ) : (
            "Você não possui um plano ativo."
          )}{" "}
          <Link
            isExternal
            showAnchorIcon
            anchorIcon={
              <MoveRight className="pl-1 focus:outline-none" width={20} />
            }
            href={getCurrentDomain("", "/precos")}
          >
            Veja mais
          </Link>
        </p>
        {hasSub ? (
          <Card isPressable className="w-fit min-w-[300px] space-y-4 p-6">
            <h3 className="m-0 p-0 font-cal text-lg dark:text-white">
              Plano Padrão
            </h3>
            <p className="text-base text-gray-400">R$150/mês</p>
          </Card>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-stone-700 dark:bg-stone-800">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Seu plano atual.
        </p>
        <Button
          as={Link}
          href={hasSub ? manage_link : checkout_link}
          className="border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
          variant="bordered"
          radius="sm"
        >
          {hasSub ? "Gerenciar" : "Assinar"} Plano
        </Button>
      </div>
    </div>
  );
}
