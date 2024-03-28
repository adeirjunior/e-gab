import { Gamepad, ShieldPlus, Axe } from "lucide-react";

export const plansData = [
  {
    name: "free",
    title: "Grátis",
    description: "No máximo 1 usuário.",
    Icon: Gamepad,
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
  {
    name: "pro",
    title: "Pro",
    description: "No máximo 4 usuário.",
    Icon: Axe,
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  {
    name: "business",
    title: "Profissional",
    description: "No máximo 10 usuário.",
    Icon: ShieldPlus,
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
];
