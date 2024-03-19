"use client"

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { Header } from "./Header";
import { confirmVariants } from "@/lib/variants/confirmVariants";
import { containerVariants } from "@/lib/variants/containerVariants";
import { firstStepVariants } from "@/lib/variants/firstStepVariants";
import { Step1 } from "./FormSteps/step-1";
import { Step2 } from "./FormSteps/step-2";
import { Step3 } from "./FormSteps/step-3";
import { Step4 } from "./FormSteps/step-4";
import { Step5 } from "./FormSteps/step-5";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";

export const AppContainer = () => {
  const { activeStep, direction } = useNewUserSteps();

  return (
    <>
      <div className="lg:hidden ">
        <Header activeStep={activeStep} />
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

            {activeStep === 2 && <Step2 />}

            {activeStep === 3 && <Step3 />}

            {activeStep === 4 && <Step4 />}

            {activeStep === 5 && <Step5 />}
          </motion.div>
        </AnimatePresence>
        {activeStep <= 4 && <Footer />}
      </div>

      <div className=" hidden w-full lg:flex lg:min-h-screen lg:items-center lg:justify-center">
        <div className="max-w-[550px]">
          <Sidebar activeStep={activeStep} />
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-2 min-h-[40vh]  "
            >
              {activeStep === 1 && <Step1 />}

              {activeStep === 2 && <Step2 />}

              {activeStep === 3 && <Step3 />}

              {activeStep === 4 && <Step4 />}

              {activeStep === 5 && <Step5 />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};
