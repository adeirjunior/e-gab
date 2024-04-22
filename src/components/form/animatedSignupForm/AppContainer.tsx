"use client"

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { Header } from "./Header";
import { confirmVariants } from "@/lib/variants/confirmVariants";
import { containerVariants } from "@/lib/variants/containerVariants";
import { firstStepVariants } from "@/lib/variants/firstStepVariants";
import { Step1 } from "./FormSteps/step-1";
import { PoliticianPath1 } from "./FormSteps/politician-path-1";
import { Step5 } from "./FormSteps/step-5";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { InvitedPath1 } from "./FormSteps/invited-path-1";
import { PoliticianPath2 } from "./FormSteps/politician-path-2";
import { PoliticianPath3 } from "./FormSteps/politician-path-3";

export const AppContainer = () => {
  const { activeStep, selectedRole, direction } = useNewUserSteps();

  return (
    <>
      <div className="lg:hidden ">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={activeStep}
            variants={
              activeStep === 1
                ? firstStepVariants
                : activeStep === 5
                  ? confirmVariants
                  : containerVariants
            }
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={direction}
            className="step-container-box"
          >
            {activeStep === 1 && <Step1 />}

            {activeStep === 2 && (
              <>
                {selectedRole === "politician" ? (
                  <PoliticianPath1 />
                ) : (
                  <InvitedPath1 />
                )}
              </>
            )}

            {activeStep === 3 && (
              <>
                {selectedRole === "politician" ? (
                  <PoliticianPath2 />
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

      <div className=" hidden w-full lg:flex lg:min-h-screen lg:items-center lg:justify-center">
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
                    <PoliticianPath1 />
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
        </div>
      </div>
    </>
  );
};