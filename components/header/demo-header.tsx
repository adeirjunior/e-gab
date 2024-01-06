"use client"

import { Image, Link } from "@nextui-org/react";
import Hamburger from "hamburger-react";
import { useState } from "react";

export default function DemoHeader() {
    const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <header className="container relative mx-auto p-5 md:px-5 md:pb-5 md:pt-0">
      <div className="flex items-center justify-between">
        <div>
          <Image
            src="/demo-logo.png"
            className="h-12 w-auto"
            alt="Billy Pace Logo"
            width={400}
            height={200}
          />
        </div>
        <nav className="hidden items-center space-x-8 md:flex">
          <Link
            href=""
            className="font-saira hover:text-demoSecondary uppercase text-gray-700 transition-all hover:underline hover:decoration-4 hover:underline-offset-4 sm:text-sm sm:font-bold md:text-base lg:text-large"
          >
            About
          </Link>
          <Link
            href=""
            className="font-saira hover:text-demoSecondary uppercase text-gray-700 transition-all hover:underline hover:decoration-4 hover:underline-offset-4 sm:text-sm sm:font-bold md:text-base lg:text-large"
          >
            Issues
          </Link>
          <Link
            href=""
            className="font-saira hover:text-demoSecondary uppercase text-gray-700 transition-all hover:underline hover:decoration-4 hover:underline-offset-4 sm:text-sm sm:font-bold md:text-base lg:text-large"
          >
            Vote
          </Link>
          <Link
            href=""
            className="font-saira hover:text-demoSecondary uppercase text-gray-700 transition-all hover:underline hover:decoration-4 hover:underline-offset-4 sm:text-sm sm:font-bold md:text-base lg:text-large"
          >
            Store
          </Link>
          <Link
            href=""
            className="font-saira hover:text-demoSecondary uppercase text-gray-700 transition-all hover:underline hover:decoration-4 hover:underline-offset-4 sm:text-sm sm:font-bold md:text-base lg:text-large"
          >
            Contact
          </Link>
        </nav>
        <Link
          href="#"
          className="font-saira bg-demoSecondary hidden px-7 py-1.5 font-bold uppercase text-white hover:opacity-80 md:block"
        >
          Donate
        </Link>

        <button className="md:hidden">
          <Hamburger
            toggled={isOpen}
            direction="right"
            color="#EC3F8C"
            toggle={setOpen}
          />
        </button>
      </div>

      <div className="md:hidden">
        <nav
          className={`${
            isOpen ? "" : "hidden"
          } flex font-gray-700 absolute left-0 right-0 z-50 mt-7 px-4 items-center self-center justify-between bg-white py-5 font-bold uppercase drop-shadow-lg`}
        >
          <Link href="#">About</Link>
          <Link href="#">Issues</Link>
          <Link href="#">Vote</Link>
          <Link href="#">Store</Link>
          <Link href="#">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
