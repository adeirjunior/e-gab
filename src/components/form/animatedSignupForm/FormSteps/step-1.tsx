"use client";

import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import { ButtonContainerLg } from "../ButtonContainerLg";

export function Step1() {
   const { selectedRole, setSelectedRole } = useNewUserSteps();

  const tabs = [
    {
      id: "politician",
      label: "Político",
      content:
        "Você é um político ou representante que quer ter sua própria plataforma para entrar com contato com a população.",
    },
    {
      id: "invited",
      label: "Convidado",
      content:
        "Você foi convidado por um político ou administrador para visualizar ou adminstrar a plataforma do site do político.",
    },
  ];

  return (
    <div className="mx-auto max-w-[550px] rounded-lg border-3 p-12 dark:border-gray-600 ">
      <motion.div
        className="flex w-full flex-col gap-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 className="text-3xl font-bold dark:text-gray-200">
          Bem-vindo ao E-Gab!
        </motion.h1>
        <motion.h2 className="text-xl font-bold dark:text-gray-200">
          O que você é?
        </motion.h2>
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs
            variant="bordered"
            aria-label="Options"
            selectedKey={selectedRole}
            onSelectionChange={setSelectedRole as any}
            classNames={{
              panel: "py-6",
            }}
            items={tabs}
          >
            {(item) => (
              <Tab key={item.id} title={item.label}>
                <Card>
                  <CardBody>
                    <p className="text-center text-lg font-semibold dark:text-gray-200">
                      {item.content}
                    </p>
                  </CardBody>
                </Card>
              </Tab>
            )}
          </Tabs>
        </motion.div>
      </motion.div>
      <ButtonContainerLg />
    </div>
  );
}
