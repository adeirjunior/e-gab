"use client";

import { LogOut } from "lucide-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, User } from "@nextui-org/react";
import { Metric, Title, Subtitle, Bold, Italic, Text } from "@tremor/react";
import { signOut } from "next-auth/react";

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
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: user.image ?? `https://avatar.vercel.sh/${user.email}`,
          }}
          className="transition-transform"
          classNames={{
            name: "dark:text-gray-300",
            description: "dark:text-gray-100",
          }}
          description="@tonyreichert"
          name={user.name}
        />
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
