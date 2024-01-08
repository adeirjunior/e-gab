"use client"

import { Button, Link, Tab, Tabs } from "@nextui-org/react";
import { UserRole } from "@prisma/client";
import { useState } from "react";

export default function page() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<UserRole>("Politician");
  return (
    <div className="mx-3 border border-stone-200 px-3 py-10 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md dark:border-stone-700">
        <h1>Você é um usuário novo!</h1>
        <h2>Faça as suas configurações iniciais para começar a usar nossa plataforma</h2>
        <Tabs size="lg" className="block" >
            <Tab key="politician" title="Político" />
            <Tab key="secretary" title="Secretário" />
        </Tabs>
        <Button as={Link} href="/" className="mt-4">Sair daqui</Button>
    </div>
  )
}
