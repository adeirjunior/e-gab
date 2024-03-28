"use client";

import { useEffect, useState } from "react";
import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { plansData } from "@/lib/constants/plansData";
import { ButtonContainerLg } from "../ButtonContainerLg";
import { RadioGroup, Switch } from "@nextui-org/react";
import { CustomRadio } from "../radio-group";
import { toast } from "sonner";

export const PoliticianPath1 = () => {
  const [isShowing, setIsShowing] = useState(false);

  const { selectedPlan, setSelectedPlan, billing, setBilling } =
    useNewUserSteps();

  return (
    <>
      <div>
        <RadioGroup
          label="Selecione seu plano"
          description="Você tem a opção de pagamento mensal ou anual."
          value={selectedPlan.name}
          onChange={(e) => setSelectedPlan(plansData.filter((plan) => plan.name === e.target.value)[0])}
        >
          {plansData.map((p, index: number) => (
            <CustomRadio key={index} description={p.description} value={p.name}>
              {p.title}
            </CustomRadio>
          ))}
        </RadioGroup>
      </div>

      <div className="bg-neutral-Magnolia flex w-full items-center justify-center rounded p-2">
        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            billing === "monthly"
              ? "text-primary-Marine_blue"
              : "text-neutral-Cool_gray"
          } `}
        >
          Mensalmente
        </span>

        <Switch
          checked={billing === "monthly" ? false : true}
          onChange={() => {
            if (billing === "monthly") {
              setBilling("yearly");
              setIsShowing(true);
            }
            if (billing === "yearly") {
              setBilling("monthly");
              setIsShowing(false);
            }
          }}
          className={`bg-primary-Marine_blue relative mx-5 inline-flex h-5 w-9 items-center rounded-full`}
        >
          <span className="sr-only">Habilitar notificações</span>
          <span
            className={`${
              billing === "yearly" ? "translate-x-5" : "translate-x-1"
            } bg-neutral-White inline-block h-3 w-3 transform rounded-full transition`}
          />
        </Switch>
        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            billing === "yearly"
              ? "text-primary-Marine_blue"
              : "text-neutral-Cool_gray"
          }`}
        >
          Anualmente
        </span>
      </div>
      <ButtonContainerLg />
    </>
  );
};
