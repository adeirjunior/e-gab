"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function SiteSettingsNav() {
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      name: "Geral",
      href: `/site`,
      segment: null,
    },
    {
      name: "Domínios",
      href: `/site/dominios`,
      segment: "dominios",
    },
    {
      name: "Aparência",
      href: `/site/aparencia`,
      segment: "aparencia",
    },
    {
      name: "Contato",
      href: `/site/contato`,
      segment: "contato",
    },
    {
      name: "Redes Sociais",
      href: `/site/redes`,
      segment: "redes",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-center space-x-4 border-b border-stone-200 px-8 pb-4 pt-2 sm:justify-start dark:border-stone-700">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          // Change style depending on whether the link is active
          className={cn(
            "rounded-md px-2 py-1 m-0 text-sm font-medium transition-colors active:bg-stone-200 dark:active:bg-stone-600",
            segment === item.segment
              ? "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
              : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800",
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
