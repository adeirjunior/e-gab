import { ReactNode, Suspense } from "react";
import Profile from "@/components/profile";
import Nav from "@/components/nav";
import { NextThemeProvider } from "@/app/next-themes-provider";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider theme="dark"> <div>
      <Nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </Nav>
      <div className="min-h-screen dark:bg-black sm:pl-60">{children}</div>
    </div></NextThemeProvider>
   
  );
}
