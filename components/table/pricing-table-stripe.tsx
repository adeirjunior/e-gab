"use client"

import { Tab, Tabs } from "@nextui-org/react";
import { Key } from "react";
import SubscriptionCard from "../card/subscription-card";

const products = [
  {
    products: [
      {
        name: "Padrão",
        type: "year",
        price: "1500",
        productId: "price_1NDCZ3IMQotP1KSIxFBL4LwI",
        description: [
          "Quer dar inicio?",
          "5 usuários",
          "Atualizações gratuitas",
          "3 meses de suporte",
        ],
        active: true,
      },
      {
        name: "Profissional",
        type: "year",
        price: "2000",
        productId: "price_1NDCYGIMQotP1KSIv178valr",
        description: [
          "Desbloqueie Todo o Potencial!",
          "Usuários ilimitados",
          "Atualizações gratuitas",
          "Suporte 24/7",
        ],
        active: true,
      },
    ],
  },
  {
    products: [
      {
        name: "Padrão",
        type: "month",
        price: "150",
        productId: "price_1NDCZ3IMQotP1KSIxFBL4LwI",
        description: [
          "Quer dar inicio?",
          "5 usuários",
          "Atualizações gratuitas",
          "3 meses de suporte",
        ],
        active: true,
      },
      {
        name: "Profissional",
        type: "month",
        price: "200",
        productId: "price_1NDCYGIMQotP1KSIv178valr",
        description: [
          "Desbloqueie Todo o Potencial!",
          "Usuários ilimitados",
          "Atualizações gratuitas",
          "Suporte 24/7",
        ],
        active: true,
      },
    ],
  },
];

export function ProductCard({
  selectedPlan,
  product,
}: {
  selectedPlan: {
    plan: string;
    setPlan: React.Dispatch<React.SetStateAction<string>>;
  };
  product: {
    name: string;
    type: string;
    price: string;
    productId: string;
    description: string[];
    active: boolean;
  };
}) {
  if (product.active) {
    return (
      <div
        className={`border-2 p-10 hover:cursor-pointer ${
          selectedPlan.plan === product.productId
            ? "-translate-y-2"
            : "hover:-translate-y-2"
        } min-h-[22rem] w-full max-w-[21rem] bg-black transition-all`}
        onClick={() => selectedPlan.setPlan(product.productId)}
      >
        <div className="mb-2 text-3xl font-bold capitalize">
          {product.name} Plan
        </div>
        <div className="mb-2 flex items-baseline">
          <div className="mr-2 text-3xl">${product.price}</div> Per{" "}
          {product.type}
        </div>
        <ul className="list-disc pl-4 ">
          {product.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div
      className={`min-h-[22rem] w-full max-w-[21rem] border-2 border-neutral-400 bg-black p-10 text-neutral-400`}
    >
      <div className="mb-2 text-3xl font-bold capitalize">
        {product.name} Plan
      </div>
      <div className="mb-2 flex items-baseline">
        <div className="mr-2 text-3xl">${product.price}</div> Per {product.type}
      </div>
      <ul className="list-disc pl-4 ">
        {product.description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingTable({
  selectedPlan,
  selectedType,
}: {
  selectedPlan: {
    plan: string;
    setPlan: React.Dispatch<React.SetStateAction<string>>;
  };
  selectedType: {
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
  };
}) {
  return (
    <>
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
            <span className="mb-2 block text-lg font-semibold text-blue-900">
              Preços
            </span>
            <h2
              className="
                  text-dark
                  mb-4
                  text-3xl
                  font-bold
                  sm:text-4xl
                  md:text-[40px]
                  "
            >
              Nossos Planos
            </h2>
            <p className="text-body-color text-base">
              Veja e escolha o plano que melhor te atende.
            </p>
          </div>
        </div>
      </div>
      <Tabs
        selectedKey={selectedType.type}
        onSelectionChange={(key: Key) => selectedType.setType(key as string)}
        size="lg"
        className="mx-auto mb-8 block max-w-60"
      >
        <Tab key="monthly" title="Mês" />
        <Tab key="yearly" title="Ano" />
      </Tabs>
      <div className="-mx-4 flex flex-wrap justify-center gap-6">
        {selectedType.type === "monthly"
          ? products[1].products.map((product, index) => (
              <SubscriptionCard
                selectedPlan={selectedPlan}
                product={product}
                key={index}
              />
            ))
          : products[0].products.map((product, index) => (
              <SubscriptionCard
                selectedPlan={selectedPlan}
                product={product}
                key={index}
              />
            ))}
      </div>
    </>
  );
}
