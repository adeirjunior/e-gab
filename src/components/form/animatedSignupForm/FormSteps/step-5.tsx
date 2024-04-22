"use client";

import { motion } from "framer-motion";
import LoadingSpinner from "../../loading-spinner";
import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import { useEffectOnce } from "usehooks-ts";
import { useRouter } from "next/navigation";

const childVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};
export const Step5 = () => {
const router = useRouter()
  const {
    selectedRole,
  } = useNewUserSteps();

  useEffectOnce(() => {
    setTimeout(() => {
if(selectedRole === "politician") {
router.push("/criar-site")
} else {

}
    }, 500)
  })

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.h4 variants={childVariants}>Obrigado!</motion.h4>
      <motion.p variants={childVariants} className="text-center">
        Obrigado por confirmar sua inscrição! Esperamos que goste de usar nossa
        plataforma. Se tiver qualquer dúvida no funcionamento da plataforma,
        consulte a nossa documentação.
      </motion.p>
      <LoadingSpinner/>
    </div>
  );
};
