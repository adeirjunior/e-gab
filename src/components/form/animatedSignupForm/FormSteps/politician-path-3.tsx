"use client"

import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { ButtonContainerLg } from "../ButtonContainerLg";
import { useSession } from "next-auth/react";
import { Bold } from "@tremor/react";

export const PoliticianPath3 = () => {
  const {
    selectedPlan,
    billing,
    selectedAddOns,
    CalcTotalAmount,
    setActiveStep,
    setDirection,
    politicianParty
  } = useNewUserSteps();

  const {data, status} = useSession()
  return (
    <>
      <h4>Finalizando</h4>
      <p> Verifique se tudo esta OK antes de confirmar.</p>
      <div className="bg-neutral-Magnolia my-8 rounded-lg p-3">
        <div className="border-neutral-Light_gray flex items-center justify-between border-b">
          <div className="flex flex-col">
            <p>
              Você é um <Bold>político</Bold>
            </p>
            <p>
              Seu partido é <Bold>{politicianParty}</Bold>
            </p>
          </div>
        </div>

        <div>
          {selectedAddOns?.map((ao, index) => (
            <div key={index} className="my-2 flex items-center justify-between">
              <span className="text-neutral-Cool_gray text-sm">{ao.title}</span>
              <span className="text-primary-Marine_blue text-sm">
                +R$
                {billing === "monthly"
                  ? `R${ao.monthlyPrice}/mês`
                  : `R${ao.yearlyPrice}/ano`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ButtonContainerLg />
    </>
  );
};
