import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | E-Gab",
    default: "E-Gab"
  },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" bg-black flex justify-center items-center dark">
      <div className=" flex min-h-screen flex-col items-center justify-center gap-4 px-6 lg:max-w-5xl lg:flex-row lg:justify-between">
        {children}
      </div>
    </div>
  );
}
