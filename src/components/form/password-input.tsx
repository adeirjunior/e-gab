"use client"

import { InputProps, Input, Button, LinkProps } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordInput(props: InputProps) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      {...props}
      type={isVisible ? "text" : "password"}
      endContent={
        <Button
          className="focus:outline-none my-auto"
          type="button"
          isIconOnly
          variant="bordered"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <Eye className="pointer-events-none text-2xl text-default-400" />
          ) : (
            <EyeOff className="pointer-events-none text-2xl text-default-400" />
          )}
        </Button>
      }
    />
  );
}