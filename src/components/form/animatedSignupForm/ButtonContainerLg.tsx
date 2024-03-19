"use client"

import {useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { FirstStepValidationSchema } from "@/lib/validations/FirstStepValidation.";
import { Button } from "@nextui-org/react";

export const ButtonContainerLg = () => {
   const {
     activeStep,
     setActiveStep,
     setDirection,
     setFirstStepErrors,
     userData,
   } = useNewUserSteps();
  return (
    <div
      className={`bg-neutral-White mt-3 hidden  w-full items-center lg:flex ${
        activeStep > 1 ? "justify-between" : "justify-end"
      }  p-3`}
    >
      {activeStep > 1 && (
        <Button
          variant="bordered"
          onClick={() => {
            setActiveStep((prev: number) => prev - 1);
            setDirection(-1);
          }}
          className="text-neutral-Cool_gray rounded bg-transparent p-2  font-medium transition hover:opacity-80"
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
        {activeStep === 4 || activeStep === 5 ? "Confirmar" : "Próximo"}
      </Button>
    </div>
  );
};
