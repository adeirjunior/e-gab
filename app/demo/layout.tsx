import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | E-Gab Demo",
    default: "E-Gab Demo"
  },
  description: 'Esta é uma demonstração de como é uma página criada por meio da plataforma E-Gab',
  icons: ["https://vercel.pub/favicon.ico"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        {children}
    </div>  
  );
}
