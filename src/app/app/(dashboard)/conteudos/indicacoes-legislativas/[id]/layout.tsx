import { ReactNode } from "react";

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-6 sm:p-10">
      {children}
    </div>
  );
}
