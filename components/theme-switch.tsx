"use client";

import { Switch } from "@nextui-org/react";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

const ThemeSwitch = ({className}: {className?: string}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffectOnce(() => {
    setMounted(true);
  });

  if (!mounted) return null;

  return (
    <Switch
      isSelected={theme === "light"}
      onValueChange={switchTheme}
      size="lg"
      color="success"
      className={className}
      startContent={<Sun />}
      endContent={<Moon />}
    >
      Tema {theme === "light" ? "claro" : "escuro"}
    </Switch>
  );
};

export default ThemeSwitch;
