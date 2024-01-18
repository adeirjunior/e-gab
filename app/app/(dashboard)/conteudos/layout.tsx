import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col space-y-12">
      <div className="flex flex-col items-center justify-center space-y-6 p-8">
        {children}
      </div>
    </div>
  );
}
