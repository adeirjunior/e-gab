"use client";

import { Card, Tab, Tabs } from "@nextui-org/react";
import PricingPableSvg from "./pricing-table-svg";
import { pricingTable } from "@/lib/data/pricing-table";
import { Key, useState } from "react";
import { getCurrentDomain } from "@/lib/utils";

export default function PricingTable() {
  type KeyType = "ano" | "mes";

  const [isMonthly, setIsMonthly] = useState<KeyType>("mes");

  return (
    <div className="container light">
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
        selectedKey={isMonthly}
        onSelectionChange={(key: Key) => setIsMonthly(key as KeyType)}
        size="lg"
        className="mx-auto mb-8 block max-w-60"
      >
        <Tab key="mes" title="Mês" />
        <Tab key="ano" title="Ano" />
      </Tabs>
      <div className="-mx-4 flex flex-wrap justify-center">
        {pricingTable.map(
          ({ description, name, monthPrice, yearPrice, items }, index) => (
            <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3">
              <Card
                className="
               shadow-pricing
               relative
               z-10
               mb-10
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
                  {name}
                </span>
                <h2 className="text-dark mb-5 text-[42px] font-bold">
                  R${isMonthly === "mes" ? monthPrice : yearPrice}
                  <span className="text-body-color text-base font-medium">
                    / {isMonthly === "mes" ? "mês" : "ano"}
                  </span>
                </h2>
                <p
                  className="
                  text-body-color mb-8
                  border-b
                  border-[#F2F2F2]
                  pb-8 text-base
                  "
                >
                  {description}
                </p>
                <div className="mb-7">
                  {items.map(({ name }, index) => (
                    <p
                      key={index}
                      className="text-body-color mb-1 text-base leading-loose"
                    >
                      {name}
                    </p>
                  ))}
                </div>
                <a
                  href="javascript:void(0)"
                  className="
                  block
                  w-full
                  rounded-md
                  border
                  border-[#D4DEFF]
                  bg-transparent
                  p-4 text-center
                  text-base
                  font-semibold
                  text-blue-900
                  transition hover:border-purple-600 hover:bg-purple-600
                  hover:text-white
                  "
                >
                  Escolha {name}
                </a>
                <PricingPableSvg />
              </Card>
            </div>
          ),
        )}
        <div className="w-full px-4">
          <Card
            className="
               shadow-pricing
               relative
               z-10
               mb-10
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
            <a
              target="demo"
              href={getCurrentDomain("demo")}
              className="
                  block
                  w-full
                  rounded-md
                  border
                  border-[#D4DEFF]
                  bg-transparent
                  p-4 text-center
                  text-base
                  font-semibold
                  text-blue-900
                  transition hover:border-purple-600 hover:bg-purple-600
                  hover:text-white
                  "
            >
              Veja a Demo
            </a>
            <PricingPableSvg />
          </Card>
        </div>
      </div>
    </div>
  );
}
