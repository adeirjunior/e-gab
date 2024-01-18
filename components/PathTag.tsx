"use client";

import { usePathname } from "next/navigation";

export default function PathTag() {
  const path = usePathname();
  return <h1>Página {path}</h1>;
}
