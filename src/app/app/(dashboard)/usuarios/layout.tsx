import { ReactNode } from "react";

export default function UsersLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      {children}
    </div>
  );
}
