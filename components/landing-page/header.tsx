"use client"

import Hamburger from "hamburger-react";
import Link from "next/link";
import { useState } from "react";


export default function Header() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <header className="relative flex h-24 items-center sm:h-32">
        <div className="container mx-auto flex items-center justify-between px-6 sm:px-12">
          <div className="flex items-start text-2xl font-black text-blue-900">
            E-Gab
            <span className="ml-2 h-3 w-3 rounded-full bg-purple-600"></span>
          </div>
          <nav className="hidden items-center text-lg text-purple-900 lg:flex">
            <Link href="/" className="flex px-8 py-2 hover:text-purple-700">
              Home
            </Link>
            <Link
              href="/sobre"
              className="flex px-8 py-2 hover:text-purple-700"
            >
              Sobre
            </Link>
            <Link
              href="/precos"
              className="flex px-8 py-2 hover:text-purple-700"
            >
              Preços
            </Link>
            <Link
              href="/contato"
              className="flex px-8 py-2 hover:text-purple-700"
            >
              Contato
            </Link>
          </nav>
          <div className="flex items-center lg:hidden">
            <Hamburger
              color="#6B21A8"
              toggled={isOpen}
              direction="right"
              toggle={setOpen}
            />
          </div>
        </div>
        <div
          className={`container absolute left-1/2 top-full z-40 flex -translate-x-1/2 w-full items-center justify-between overflow-hidden bg-gray-100 px-6 transition-height duration-300 ease-in sm:px-12 ${
            isOpen ? "h-fit" : "hidden h-[1px]"
          }`}
        >
          <nav
            className={`w-full  items-center text-lg text-purple-900 lg:hidden`}
          >
            <Link href="/" className="flex px-8 py-2 hover:text-purple-700">
              Home
            </Link>
            <Link
              href="/sobre"
              className="flex px-8 py-2 hover:text-purple-700"
            >
              Sobre
            </Link>
            <Link
              href="/precos"
              className="flex px-8 py-2 hover:text-purple-700"
            >
              Preços
            </Link>
            <Link
              href="/contato"
              className="flex px-8 py-2 hover:text-purple-700"
            >
              Contato
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
