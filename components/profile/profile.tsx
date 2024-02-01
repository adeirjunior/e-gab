"use client";

import { LogOut } from "lucide-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, User } from "@nextui-org/react";
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
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="m-0 p-0 font-bold dark:text-gray-300">Entrou como</p>
          <p className="m-0 p-0 font-bold dark:text-gray-300">@tonyreichert</p>
        </DropdownItem>
        <DropdownItem as={Link} href="/configuracoes" className="dark:text-gray-300" key="settings">
          Configurações
        </DropdownItem>
        <DropdownItem as={Link} href="/sistema" className="dark:text-gray-300" key="system">
          Sistema
        </DropdownItem>
        <DropdownItem
          className="dark:text-gray-300"
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
