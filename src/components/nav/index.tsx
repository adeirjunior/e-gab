/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Menu } from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getExternalLinks } from "./external-links";
import { getTabs } from "./tabs";
import { NavLink } from "./nav-link";
import { Icon } from "./icon";
import { cn, getCurrentDomain } from "@/lib/utils";
import { useEffectOnce } from "usehooks-ts";
import EGabLogo from "../icons/EGabLogo";
import { CldImage } from "next-cloudinary";
import { Admin, Politician, User, Website } from "@prisma/client";
import { Button } from "@nextui-org/react";

export default function Nav({
  children,
  site,
  user
}: {
  children: ReactNode;
  site: Website;
  user: User & {politician: Politician, admin: Admin}
}) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };
  const [externalLinks, setExternalLinks] = useState<Array<any> | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const pathname = usePathname();

  const tabs = useMemo(() => getTabs(segments, id, user ), [segments, id]);

  useEffectOnce(() => {
    const fetchExternalLinks = async () => {
      const links = await getExternalLinks(site.subdomain!);
      setExternalLinks(links);
    };

    fetchExternalLinks();
  });

  useEffect(() => {
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <Button
      isIconOnly
        className={`fixed z-20 ${
          segments[0] === "posts" && segments.length === 2 && !showSidebar
            ? "left-5 top-5"
            : "right-5 top-7"
        } dark:text-gray-300 sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </Button>
      <div
        className={cn(
          "fixed z-10 flex h-full transform flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0",
          showSidebar ? "w-full translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            <Link
              href={getCurrentDomain()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-1.5 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <EGabLogo />
            </Link>
            <div className="h-6 rotate-[30deg] border-l border-stone-400 dark:border-stone-500" />
            <Link
              href="/"
              className="rounded-lg p-2 hover:bg-stone-200 dark:hover:bg-stone-700"
            >
              <Link className="block text-teal-600" href="/">
                <span className="sr-only">Home</span>
                <CldImage
                  alt={`logo de ${site.name}`}
                  src={site.logo}
                  width={50}
                  height={50}
                />
              </Link>
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
