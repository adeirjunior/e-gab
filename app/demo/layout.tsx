

import { default as Footer } from "@/components/demo/footer-layout-2";
import { default as Header } from "@/components/demo/header-layout-2";
import { Metadata } from "next";
import { NextThemeProvider } from "../next-themes-provider";


export const metadata: Metadata = {
  title: {
    template: "%s | E-Gab Demo",
    default: "E-Gab Demo",
  },
  description:
    "Esta é uma demonstração de como é uma página criada por meio da plataforma E-Gab",
  icons: ["https://vercel.pub/favicon.ico"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemeProvider theme="light">
      <div>
      <Header />
      
        {children}
      
      <Footer />
    </div>
    </NextThemeProvider>
    
   
  );
}
