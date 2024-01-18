/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Menu } from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getExternalLinks } from "./external-links";
import { getTabs } from "./tabs";
import { NavLink } from "./nav-link";
import { Icon } from "./icon";
import { getCurrentDomain } from "@/lib/utils";

export default function Nav({
  children,
  subdomain,
}: {
  children: ReactNode;
  subdomain: string;
}) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };
  const [externalLinks, setExternalLinks] = useState<Array<any> | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();

  const tabs = useMemo(() => getTabs(segments, id), [segments, id]);

  useEffect(() => {
    const fetchExternalLinks = async () => {
      const links = await getExternalLinks(subdomain);
      setExternalLinks(links);
    };

    fetchExternalLinks();
  }, []);

  useEffect(() => {
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 ${
          segments[0] === "posts" && segments.length === 2 && !showSidebar
            ? "left-5 top-5"
            : "right-5 top-7"
        } sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </button>
      <div
        className={`transform ${
          showSidebar ? "w-full translate-x-0" : "-translate-x-full"
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all sm:w-60 sm:translate-x-0 dark:border-stone-700 dark:bg-stone-900`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            <Link
              href={getCurrentDomain()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <svg
                width="26"
                viewBox="0 0 76 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black dark:text-white"
              >
                <path
                  d="M37.5274 0L75.0548 65H0L37.5274 0Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
            <div className="h-6 rotate-[30deg] border-l border-stone-400 dark:border-stone-500" />
            <Link
              href="/"
              className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <Image
                src="/logo.png"
                width={24}
                height={24}
                alt="Logo"
                className="dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
              />
            </Link>
          </div>
          <div className="grid gap-1">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                Icon={<Icon name={tab.icon} width={18} />}
                href={tab.href}
                name={tab.name}
                isActive={tab.isActive!}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="grid gap-1">
            {externalLinks?.map((link) => (
              <NavLink
                key={link.name}
                Icon={<Icon name={link.icon} width={18} />}
                href={link.href}
                name={link.name}
                external
              />
            ))}
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
