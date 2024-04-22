"use client"

import { createPolitician } from "@/lib/actions/politician/politician.create.action";
import { editOneKeyUser } from "@/lib/actions/user/user.update.action";
import {useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { FirstStepValidationSchema } from "@/lib/validations/FirstStepValidation.";
import { Button } from "@nextui-org/react";

export const ButtonContainerLg = () => {
   const {
     activeStep,
     setActiveStep,
     setDirection,
     setFirstStepErrors,
     selectedRole,
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
        onClick={async() => {
          if (activeStep === 1) {
            try {
              const validatedData = FirstStepValidationSchema.parse(selectedRole);
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
          } else if(activeStep === 3 && selectedRole === "politician") {
            await editOneKeyUser(selectedRole, "role");
            await createPolitician();
            setActiveStep((prev: number) => prev + 1);
            setDirection(1);
          } else {
            setActiveStep((prev: number) => prev + 1);
            setDirection(1);
          }
        }}
        color={activeStep === 3 ? "primary" : "default"}
      >
        {activeStep === 3 || activeStep === 4 ? "Confirmar" : "Próximo"}
      </Button>
    </div>
  );
};
