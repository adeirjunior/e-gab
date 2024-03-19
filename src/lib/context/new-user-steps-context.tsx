"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import { plansData } from "../constants/plansData";

type UserData = {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  party: string;
  cpf: string;
  tel: string;
  address: string;
};

type NewUserStepsContextType = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  firstStepErrors: string[];
  setFirstStepErrors: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPlan: typeof plansData[0];
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
};

export const NewUserStepsContext = createContext<NewUserStepsContextType>({
  userData: {
    name: "",
    username: "",
    email: "",
    password: "",
    role: "politician",
    party: "",
    cpf: "",
    tel: "",
    address: "",
  },
  setUserData: () => {},
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
});

export function NewUserStepsContextProvider({ children }: { children: ReactNode }) {
  const [firstStepData, setFirstStepData] = useState<UserData>({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "politician",
    party: "",
    cpf: "",
    tel: "",
    address: "",
  });

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
        userData: firstStepData,
        setUserData: setFirstStepData,
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