import LandingTheme from "@/components/landing-page/landing-theme";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import { NextThemeProvider } from "../next-themes-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemeProvider theme="light">
      <LandingTheme>
        <Header />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </LandingTheme>
    </NextThemeProvider>
  );
}
