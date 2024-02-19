"use client";

import { LogOut } from "lucide-react";
import { Card, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, User } from "@nextui-org/react";
import { Metric, Title, Subtitle, Bold, Text } from "@tremor/react";
import { signOut } from "next-auth/react";
import { CldImage } from "next-cloudinary";

export default function Profile({
  user,
}: {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
    stripeCustomerId: string;
  };
}) {
  return (
    <Dropdown placement="top-start">
      <DropdownTrigger>
        <Card>
          <CldImage
        alt=""
          src={ user.image}
          width={50}
          height={50}
        />
        <Title>{user.name}</Title>
        <Subtitle>@username</Subtitle>
        </Card>
        
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="gap-2">
          <Bold>Entrou como</Bold>
          <Text>@tonyreichert</Text>
        </DropdownItem>
        <DropdownItem as={Link} href="/configuracoes" key="settings">
          Configurações
        </DropdownItem>
        <DropdownItem as={Link} href="/sistema" key="system">
          Sistema
        </DropdownItem>
        <DropdownItem
          onClick={() => signOut()}
          endContent={<LogOut width={18} />}
          key="logout"
          color="danger"
        >
          Sair
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
