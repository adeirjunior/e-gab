import { ReactNode } from "react";
import { NextThemeProvider } from "@/app/next-themes-provider";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemeProvider>
  );
}
