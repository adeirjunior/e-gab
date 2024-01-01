import LandingTheme from "@/components/landing-page/landing-theme";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LandingTheme>
      <Header />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </LandingTheme>
  );
}
