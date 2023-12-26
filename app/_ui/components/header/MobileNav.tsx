"use client";

import { navPaths } from "@/app/_lib/navPaths";
import { Link } from "@nextui-org/react";
import { useState } from "react";
import { Cross as Hamburger } from "hamburger-react";

export default function MobileNav() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="sm:hidden">
        <div className="absolute top-5 right-5 z-40"><Hamburger toggled={isOpen} direction="right" toggle={setOpen} /></div>
      <nav
        className={`opacity-0 duration-300 transition-all ${
          isOpen ? "opacity-100 w-full" : "w-0"
        } absolute w-full top-0 left-0 h-screen bg-black grid place-content-center`}
      >
        <ul className="m-0 p-0 flex flex-col gap-4">
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
