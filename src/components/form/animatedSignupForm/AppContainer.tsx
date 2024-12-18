"use client"

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { confirmVariants } from "@/lib/variants/confirmVariants";
import { containerVariants } from "@/lib/variants/containerVariants";
import { firstStepVariants } from "@/lib/variants/firstStepVariants";
import { Step1 } from "./FormSteps/step-1";
import { PoliticianPath1 } from "./FormSteps/politician-path-1";
import { Step5 } from "./FormSteps/step-5";
import { Footer } from "./Footer";
import { InvitedPath1 } from "./FormSteps/invited-path-1";
import { PoliticianPath2 } from "./FormSteps/politician-path-2";
import { PoliticianPath3 } from "./FormSteps/politician-path-3";
import { PoliticianPath4 } from "./FormSteps/politician-path-4";

export const AppContainer = () => {
  const { activeStep, selectedRole, direction } = useNewUserSteps();

  return (
      <div className="w-full flex min-h-screen items-center justify-center">
        <div className="max-w-[550px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-2 min-h-[40vh]  "
            >
              {activeStep === 1 && <Step1 />}

              {activeStep === 2 && (
                <>
                  {selectedRole === "politician" ? (
                    <PoliticianPath4 />
                  ) : (
                    <InvitedPath1 />
                  )}
                </>
              )}

              {activeStep === 3 && (
                <>
                  {selectedRole === "politician" ? (
                    <PoliticianPath3 />
                  ) : (
                    <Step5 />
                  )}
                </>
              )}

              {activeStep === 4 && <Step5 />}
            </motion.div>
          </AnimatePresence>
          {activeStep <= 3 && <Footer />}
        </div>
      </div>
  );
};