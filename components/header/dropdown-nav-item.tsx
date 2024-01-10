"use client";

import { NavItems } from "@/lib/data/demo-header";
import { ReactNode, cloneElement, useState } from "react";

export default function DropdownNavItem({items, children}: {items:  NavItems[] ,children: ReactNode}) {
  const [isOpenDrop, setIsOpenDrop] = useState(false);

  const toggleDropdown = () => {
    setIsOpenDrop(!isOpenDrop);
  };
  const closeDropdown = () => {
    setIsOpenDrop(false);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="font-saira flex items-center uppercase text-gray-700 transition-all hover:text-demoSecondary hover:underline hover:decoration-4 hover:underline-offset-4 sm:text-sm md:text-base lg:text-large"
        onClick={toggleDropdown}
      >
        {children}{" "}
        <svg
          className="ml-2.5 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpenDrop && (
        <div className="absolute right-0 z-40 mt-2 w-44 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul>
            {items.map(({ Icon, href, name }, index) => (
              <li key={index}>
                <a
                  href={href}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex"
                  onClick={closeDropdown}
                >
                  {cloneElement(Icon)}
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
