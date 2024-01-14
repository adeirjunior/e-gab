import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentação",
};

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <div>{children}</div>;
}
