"use client"

import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { ButtonContainerLg } from "../ButtonContainerLg";
import SelectParties from "../select-parties";

export const PoliticianPath4 = () => {
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
      <h3>Partido</h3>
      <p>Por favor informe o partido em que você esta afiliado.</p>
      <SelectParties />
      <ButtonContainerLg />
    </>
  );
};
