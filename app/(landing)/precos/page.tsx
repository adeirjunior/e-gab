"use client";
import { useState } from "react";
import PricingTable from "@/components/table/pricing-table-stripe";
import { getStripe } from "@/lib/stripe/stripe-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCurrentDomain } from "@/lib/utils";

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
    <div className="container light">
      <PricingTable
        selectedPlan={{ plan: plan, setPlan: setPlan }}
        selectedType={{ type: type, setType: setType }}
      />
    </div>
  );
}
