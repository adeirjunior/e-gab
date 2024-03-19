"use client"

import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { FirstStepValidationSchema } from "@/lib/validations/FirstStepValidation.";
import { Button } from "@nextui-org/react";
export const Footer = () => {
  const {
    activeStep,
    setActiveStep,
    setDirection,
    setFirstStepErrors,
    userData,
  } = useNewUserSteps();
  return (
    <footer
      className={`bg-neutral-White  flex w-full items-start ${
        activeStep > 1 ? "justify-between" : "justify-end"
      } fixed bottom-0 left-0 right-0 h-24 p-4`}
    >
      {activeStep > 1 && (
        <Button
          variant="bordered"
          onClick={() => {
            setActiveStep((prev: number) => prev - 1);
            setDirection(-1);
          }}
          className="text-neutral-Cool_gray rounded bg-transparent p-2 text-sm font-medium"
        >
          Voltar
        </Button>
      )}

      <Button
        variant="bordered"
        onClick={() => {
          if (activeStep === 1) {
            try {
              const validatedData = FirstStepValidationSchema.parse(userData);
              console.log(validatedData);
              setFirstStepErrors([]);

              setActiveStep((prev: number) => prev + 1);
              setDirection(1);
            } catch (err) {
              if (err instanceof Error) {
                setFirstStepErrors([err.message]);
                console.log(err.message);
              }
            }
          } else {
            setActiveStep((prev: number) => prev + 1);
            setDirection(1);
          }
        }}
        color={activeStep === 4 ? "primary" : "default"}
      >
        {activeStep === 4 ? "Confirmar" : "Próximo"}
      </Button>
    </footer>
  );
};