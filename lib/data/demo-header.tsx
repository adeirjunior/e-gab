import { Book } from "lucide-react";
import { ReactElement } from "react";

export type NavItems = {
  Icon: ReactElement;
  name: string;
  href: string;
};


export const parlamentarItems: NavItems[] = [
  {
    Icon: <Book />,
    name: "Bibliografia",
    href: "/bibliografia",
  },
  {
    Icon: <Book />,
    name: "Agenda",
    href: "/agenda",
  },
  {
    Icon: <Book />,
    name: "Galeria",
    href: "/galeria",
  },
  {
    Icon: <Book />,
    name: "Projeto",
    href: "/projeto",
  },
  {
    Icon: <Book />,
    name: "Emendas",
    href: "/emendas",
  },
];

export const utilidadesItems: NavItems[] = [
  {
    Icon: <Book />,
    name: "Nossos Trabalhos",
    href: "/trabalhos",
  },
  {
    Icon: <Book />,
    name: "Ouvidoria",
    href: "/ouvidoria",
  },
  {
    Icon: <Book />,
    name: "Enquetes",
    href: "/enquetes",
  },
  {
    Icon: <Book />,
    name: "Leis",
    href: "/leis",
  },
];