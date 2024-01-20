"use client";
import { useState } from "react";
import PricingTable from "@/components/table/pricing-table-stripe";
import { getStripe } from "@/lib/stripe/stripe-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCurrentDomain } from "@/lib/utils";
import PricingPableSvg from "@/components/table/pricing-table-svg";
import { Button, Card, Link } from "@nextui-org/react";

const baseBtnStyle =
  "bg-slate-100 hover:bg-slate-200 text-black px-6 py-2 rounded-md capitalize font-bold mt-1";

export default function Page() {
  const [type, setType] = useState<string>("monthly");
  const [plan, setPlan] = useState<string>("price_1NDCWcIMQotP1KSIBt3qrxLB");
  const router = useRouter();

  const handleCreateCheckoutSession = async (productId: string) => {
    const res = await fetch(`/api/stripe/checkout-session`, {
      method: "POST",
      body: JSON.stringify(productId),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json().then((value) => {
      return value;
    });

    if ("error" in data) {
      const error = data.error as any;
      if ("message" in error) {
        toast.error(error.message as string);
        
        router.push(getCurrentDomain("app"));
      }
    }

    const checkoutSession = await res.json().then((value) => {
      return value.session;
    });

    const stripe = await getStripe();

    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession?.id,
    });

    console.warn(error.message);
  };

  return (
    <div className="container space-y-6 light">
      <PricingTable
        selectedPlan={{ plan: plan, setPlan: setPlan }}
        selectedType={{ type: type, setType: setType }}
      />
      <div className="w-full">
        <Card
          className="
               shadow-pricing
               relative
               z-10
               mb-10
               h-full
               min-h-[550px]
               overflow-hidden rounded-xl border
               border-purple-600
               border-opacity-20
               px-8
               py-10
               sm:p-12 lg:px-6
               lg:py-10
               xl:p-12
               "
        >
          <span className="mb-4 block text-lg font-semibold text-blue-900">
            Demonstração
          </span>
          <h2 className="text-dark mb-5 text-[42px] font-bold">Grátis</h2>
          <p
            className="
                  text-body-color mb-8
                  border-b
                  border-[#F2F2F2]
                  pb-8 text-base
                  "
          >
            Não oferecemos planos gratuitos, por isso temos um site de
            demonstração para que você possa ver como são os nossos sites em
            potência máxima.
          </p>
          <div className="mb-7">
            <p className="text-body-color mb-1 text-base leading-loose">
              Todos os recursos disponíveis em ação
            </p>
          </div>
          <Button
          as={Link}
            target="demo"
            
            href={getCurrentDomain("demo")}
            className="
                  absolute
                  bottom-8
                  left-10
                  right-10
                  block
                  rounded-md
                  border
                  border-[#D4DEFF]
                  bg-transparent
                  text-center
                  text-base
                  font-semibold
                  text-blue-900
                  transition hover:border-purple-600 hover:bg-purple-600
                  hover:text-white
                  "
          >
            Veja a Demo
          </Button>
          <PricingPableSvg />
        </Card>
      </div>
    </div>
  );
}
