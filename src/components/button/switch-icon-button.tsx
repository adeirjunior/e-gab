"use client";

import { Card, cn, CardProps } from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";

type SwitchIconButtonProps = CardProps & {
  DisabledIcon: ReactNode;
  EnabledIcon: ReactNode;
  handleSubmit?: (value: boolean) => any;
};

export default function SwitchIconButton(props: SwitchIconButtonProps) {
  const [isActive, setActive] = useState<boolean>(false);
  const { handleSubmit, EnabledIcon, DisabledIcon, className } = props;

  useEffect(() => {
    if (typeof handleSubmit !== "undefined") {
      handleSubmit(isActive);
    }
  }, [handleSubmit, isActive]);

  return (
    <Card
      {...props}
      isPressable
      onPress={() => {
        setActive(!isActive);
      }}
      className={cn("rounded-none bg-transparent shadow-none", className)}
    >
      {isActive ? EnabledIcon : DisabledIcon}
    </Card>
  );
}
