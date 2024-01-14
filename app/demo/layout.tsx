import DemoHeader from "@/components/header/demo-header";
import { getCurrentYear } from "@/lib/utils";
import { Image, Link } from "@nextui-org/react";
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
      <section className="socials container mx-auto mt-2 hidden justify-end space-x-2 px-5 py-1 md:flex">
        <div>
          <Link href="#" title="Twitter Link">
            <i className="fa-brands fa-twitter fa-lg text-gray-700 hover:text-demoSecondary hover:transition-all"></i>
          </Link>
        </div>
        <div>
          <Link href="#" title="Facebook Link">
            <i className="fa-brands fa-facebook fa-lg text-gray-700 hover:text-demoSecondary hover:transition-all"></i>
          </Link>
        </div>
        <div>
          <Link href="#" title="Instagram Link">
            <i className="fa-brands fa-instagram fa-lg text-gray-700 hover:text-demoSecondary hover:transition-all"></i>
          </Link>
        </div>
        <div>
          <Link href="#" title="YouTube Link">
            <i className="fa-brands fa-youtube fa-lg text-gray-700 hover:text-demoSecondary hover:transition-all"></i>
          </Link>
        </div>
      </section>

      <DemoHeader />

      {children}

      <footer className="container mx-auto mt-5 bg-white p-4 md:px-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="#" className="mb-4 flex items-center sm:mb-0">
            <Image
              src="/demo-logo.png"
              className="h-12 w-auto"
              alt="Billy Pace Logo"
            />
          </Link>
          <ul className="mb-6 flex flex-wrap items-center text-base font-medium sm:mb-0 dark:text-gray-700">
            <li>
              <Link
                href="#"
                className="font-saira mr-4 text-gray-700 transition-all hover:text-demoSecondary hover:underline hover:decoration-2 hover:underline-offset-4 md:mr-6"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-saira mr-4 text-gray-700 transition-all hover:text-demoSecondary hover:underline hover:decoration-2 hover:underline-offset-4 md:mr-6"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-saira mr-4 text-gray-700 transition-all hover:text-demoSecondary hover:underline hover:decoration-2 hover:underline-offset-4 md:mr-6"
              >
                Licensing
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-saira mr-4 text-gray-700 transition-all hover:text-demoSecondary hover:underline hover:decoration-2 hover:underline-offset-4 md:mr-6"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="sm:mx-aut my-6 border-2 border-demoPrimary lg:my-8" />
        <span className="block text-sm text-gray-700 sm:text-center">
          © {getCurrentYear()} Billy Pace For Arcadia. All Rights Reserved.
        </span>
      </footer>
    </div>
  );
}
