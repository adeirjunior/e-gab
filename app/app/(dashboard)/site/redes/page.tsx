"use client";

import {
  Avatar,
  Button,
  Card,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { AtSign, Instagram, Youtube } from "lucide-react";
import Facebook from "@/components/website/svg/facebook.svg";
import Tiktok from "@/components/website/svg/tiktok.svg";
import Twitter from "@/components/website/svg/twitter.svg";

export default function Page() {
  return (
    <div>
      <Card shadow="lg" className="w-full p-6">
        <form className="space-y-4" action="">
          <div className="flex flex-row gap-4">
            <Input
              name="socialMediaName"
              variant="bordered"
              radius="md"
              isRequired
              label="Nome de usuário"
              placeholder="@nomedeusuario"
              endContent={<AtSign />}
              classNames={{
                innerWrapper: "justify-center",
              }}
            />
            <Select className="max-w-xs" name="socialMedia" label="Rede Social">
              <SelectItem key="argentina" startContent={<Instagram />}>
                Instagram
              </SelectItem>
              <SelectItem key="venezuela" startContent={<Facebook />}>
                Facebook
              </SelectItem>
              <SelectItem key="brazil" startContent={<Twitter />}>
                X
              </SelectItem>
              <SelectItem key="switzerland" startContent={<Tiktok />}>
                Tiktok
              </SelectItem>
              <SelectItem key="germany" startContent={<Youtube />}>
                Youtube
              </SelectItem>
            </Select>
          </div>

          <Button variant="flat" type="submit">
            Salvar
          </Button>
        </form>
      </Card>
    </div>
  );
}
