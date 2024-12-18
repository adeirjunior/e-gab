"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal/provider";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import { NewUserStepsContextProvider } from "@/lib/context/new-user-steps-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <SessionProvider>
      <Toaster className="dark:hidden" />
      <Toaster theme="dark" className="hidden dark:block" />
      <NewUserStepsContextProvider>
        <NextUIProvider navigate={router.push}>
          <ModalProvider>{children}</ModalProvider>
        </NextUIProvider>
      </NewUserStepsContextProvider>
    </SessionProvider>
  );
}
