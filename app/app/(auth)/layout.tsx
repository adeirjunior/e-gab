import ThemeSwitch from "@/components/theme-switch";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | E-Gab",
    default: "E-Gab",
  },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
      <div className="flex items-center justify-center dark:bg-black">
        <ThemeSwitch className="absolute bottom-6 left-6" />
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-6 lg:max-w-5xl lg:flex-row lg:justify-between">
          {children}
        </div>
      </div>
  );
}
