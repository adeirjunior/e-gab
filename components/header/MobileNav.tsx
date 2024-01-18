"use client";

import { navPaths } from "@/lib/navPaths";
import { Link } from "@nextui-org/react";
import { useState } from "react";
import { Cross as Hamburger } from "hamburger-react";

export default function MobileNav() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="sm:hidden">
      <div className="absolute right-5 top-5 z-40">
        <Hamburger toggled={isOpen} direction="right" toggle={setOpen} />
      </div>
      <nav
        className={`opacity-0 transition-all duration-300 ${
          isOpen ? "w-full opacity-100" : "w-0"
        } absolute left-0 top-0 grid h-screen w-full place-content-center bg-black`}
      >
        <ul className="m-0 flex flex-col gap-4 p-0">
          {navPaths.map(({ name, href }, index) => (
            <li key={index}>
              <Link className="text-white" href={href}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
