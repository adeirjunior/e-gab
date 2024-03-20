"use client"

import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { ButtonContainerLg } from "../ButtonContainerLg";

export const Step4 = () => {
  const {
    selectedPlan,
    billing,
    selectedAddOns,
    CalcTotalAmount,
    setActiveStep,
    setDirection,
  } = useNewUserSteps();
  return (
    <>
      <h4>Finalizando</h4>
      <p> Verifique se tudo esta OK antes de confirmar.</p>
      <div className="bg-neutral-Magnolia my-8 rounded-lg p-3">
        <div className="border-neutral-Light_gray flex items-center justify-between border-b">
          <div className="flex flex-col">
            <h3>
              {selectedPlan.title} (
              {billing === "monthly" ? "Mensalmente" : "Anualmente"})
            </h3>
            <span
              onClick={() => {
                setActiveStep(2);
                setDirection(-1);
              }}
              className="text-neutral-Cool_gray hover:text-primary-Purplish_blue cursor-pointer pb-3 text-sm font-bold underline transition"
            >
              Mudar
            </span>
          </div>
          <span className="text-primary-Marine_blue text-sm font-bold">
            R$
            {billing === "monthly"
              ? `R${selectedPlan.monthlyPrice}/mês`
              : `R${selectedPlan.yearlyPrice}/ano`}
          </span>
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

      <div className="flex w-full items-center justify-between">
        <span className="text-neutral-Cool_gray text-sm">
          Total (por {billing === "monthly" ? "mês" : "ano"})
        </span>
        <span className="text-primary-Purplish_blue font-bold">
          +R$
          {CalcTotalAmount()}
          {billing === "monthly" ? `/mês` : `/ano`}
        </span>
      </div>
      <ButtonContainerLg/>
    </>
  );
};
