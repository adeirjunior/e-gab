"use client";

import { LogOut } from "lucide-react";
import {
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { Title, Subtitle, Bold, Text } from "@tremor/react";
import { signOut } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import { AspectRatio } from "../ui/aspect-ratio";

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
    <Dropdown offset={30} showArrow shadow="sm" placement="right-end">
      <DropdownTrigger>
        <Card isPressable className="bg-transparent border-none w-full mt-4 p-4 cursor-pointer flex flex-col shadow-none">
          <div className="flex gap-2 items-center">
            <div className="w-10 overflow-hidden rounded-full">
            <AspectRatio
              className="grid place-content-center overflow-hidden"
              ratio={1 / 1}
            >
              <CldImage alt="" src={user.image} width={50} height={50} />
            </AspectRatio>
          </div>
          <Title>{user.name}</Title>
          </div>
          
          <Subtitle>{user.email}</Subtitle>
        </Card>
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="gap-2">
          <Bold>Entrou como</Bold>
          <Text>{user.email}</Text>
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
