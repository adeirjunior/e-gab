import "@/styles/globals.css";
import { cal, inter, raleway } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/google-analytics";

const title = "E-Gab - Gabinete Virtual";
const description = "E-Gab é a maior plataforma para políticos do Brasil, com ela você consegue todas as ferramentas essenciais para o seu trabalho como vereador/deputado em um só lugar!";
const image = "/image/thumb.webp";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@adeirjunior",
  },
  metadataBase: new URL("https://egab.online"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <GoogleAnalytics />
      <body className={cn(raleway.variable, cal.variable, inter.variable)}>
        <Providers>
          {children}
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
