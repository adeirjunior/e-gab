"use client"

import { Button, Card, CardBody, Input, Tab, Tabs, Link } from "@nextui-org/react"
import { UserRole } from "@prisma/client";
import { Key, useState } from "react";
import CreateSiteModal from "../modal/create-site";

export default function NewUserForm() {
     const [selected, setSelected] = useState<UserRole>("Politician");
  return (
    <Card className="min-h-[600px] w-[340px] max-w-full">
      <CardBody className="overflow-hidden">
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          selectedKey={selected}
          onSelectionChange={(key: Key) => setSelected(key as UserRole)}
        >
          <Tab key="Politician" title="Político">
            <form action={async (data: FormData) =>
        createSite(data).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track("Created Site");
            router.refresh();
            router.push(`/site`);
            modal?.hide();
            toast.success(`Site criado com sucesso!`);
          }
        })
      } className="flex flex-col gap-4">
              <Input
                isRequired
                autoFocus
                label="Name"
                placeholder="Enter your name"
                type="name"
              />
              <Input
                isRequired
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <Input
                isRequired
                label="Password"
                placeholder="Enter your password"
                type="password"
              />

              <div className="flex justify-end gap-2">
                <Button fullWidth color="primary">
                  Criar Site
                </Button>
              </div>
            </form>
          </Tab>
          <Tab key="Secretary" title="Secretário">
            <form className="flex h-[300px] flex-col gap-4">
              <Input
                isRequired
                label="Name"
                placeholder="Enter your name"
                type="name"
              />
              <Input
                isRequired
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <Input
                isRequired
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <div className="flex justify-end gap-2">
                <Button fullWidth color="primary">
                  Conectar Site
                </Button>
              </div>
            </form>
          </Tab>
        </Tabs>
        <p className="text-center text-small text-gray-300">
          Tem uma conta?{" "}
          <Link size="sm" className="cursor-pointer" href="/login">
            Logar
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
