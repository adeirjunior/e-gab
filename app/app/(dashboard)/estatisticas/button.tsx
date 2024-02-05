"use client"

import { Button } from "@nextui-org/react";
import { toast } from "sonner";

export default function ButtonC({ hasSub }: { hasSub: boolean }) {
  const handleClick = () => {
    if (hasSub) {
      toast.success("Comando realizado com sucesso!");
    } else {
      toast.error("Você não tem permissão para realizar este comando.");
    }
  };
  return <Button onClick={handleClick}>Comando apenas para assinantes</Button>;
}
