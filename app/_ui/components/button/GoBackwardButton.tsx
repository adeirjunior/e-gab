"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function GoBackwardButton() {
  const { back } = useRouter();
  return <Button onClick={() => back()}>Retornar</Button>;
}
