"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import { plansData } from "../constants/plansData";
import { UserRole } from "@prisma/client";

type NewUserStepsContextType = {
  selectedRole: UserRole;
  setSelectedRole: React.Dispatch<React.SetStateAction<UserRole>>;
  firstStepErrors: string[];
  setFirstStepErrors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPlan: (typeof plansData)[0];
  setSelectedPlan: React.Dispatch<React.SetStateAction<any>>;
  selectedAddOns: any[];
  setSelectedAddOns: React.Dispatch<React.SetStateAction<any[]>>;
  billing: string;
  setBilling: React.Dispatch<React.SetStateAction<string>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  direction: number;
  setDirection: React.Dispatch<React.SetStateAction<number>>;
  CalcTotalAmount: () => any;
  invitedUserToken: string;
  setInvitedUserToken: React.Dispatch<React.SetStateAction<string>>;
};

export const NewUserStepsContext = createContext<NewUserStepsContextType>({
  selectedRole: "invited",
  setSelectedRole: () => {},
  firstStepErrors: [],
  setFirstStepErrors: () => {},
  selectedPlan: plansData[0],
  setSelectedPlan: () => {},
  selectedAddOns: [],
  setSelectedAddOns: () => {},
  billing: "monthly",
  setBilling: () => {},
  activeStep: 1,
  setActiveStep: () => {},
  direction: 0,
  setDirection: () => {},
  CalcTotalAmount: () => {},
  invitedUserToken: "",
  setInvitedUserToken: () => {}
});

export function NewUserStepsContextProvider({ children }: { children: ReactNode }) {
  const [invitedUserToken, setInvitedUserToken] = useState<string>("");
  const [firstStepData, setFirstStepData] = useState<UserRole>("invited");

  const [firstStepErrors, setFirstStepErrors] = useState<string[]>([]);

  const [selectedPlan, setSelectedPlan] = useState<typeof plansData[0]>(plansData[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<any[]>([]);
  const [billing, setBilling] = useState<string>("monthly");

  const [activeStep, setActiveStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);

  const CalcTotalAmount = () => {
    let totalAmount =
      billing === "monthly"
        ? selectedPlan.monthlyPrice
        : selectedPlan.yearlyPrice;
    if (selectedAddOns.length > 0) {
      selectedAddOns.forEach((ao) => {
        totalAmount += billing === "monthly" ? ao.monthlyPrice : ao.yearlyPrice;
      });
    }
    return totalAmount;
  };

  return (
    <NewUserStepsContext.Provider
      value={{
        selectedRole: firstStepData,
        setSelectedRole: setFirstStepData,
        firstStepErrors,
        setFirstStepErrors,
        selectedPlan,
        setSelectedPlan,
        selectedAddOns,
        setSelectedAddOns,
        billing,
        setBilling,
        activeStep,
        setActiveStep,
        direction,
        setDirection,
        CalcTotalAmount,
        invitedUserToken,
        setInvitedUserToken,
      }}
    >
      {children}
    </NewUserStepsContext.Provider>
  );
}

export function useNewUserSteps() {
  const context = useContext(NewUserStepsContext);
  if (context === undefined) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
}