"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Edit3,
  Globe,
  Layout,
  LayoutDashboard,
  Megaphone,
  Menu,
  Newspaper,
  Settings,
  FileCode,
  Vote,
  Scale,
  DollarSign,
  CalendarDays,
  ScrollText,
  ListChecks
} from "lucide-react";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import Image from "next/image";

const externalLinks = [
  {
    name: "Atualizações",
    href: "https://vercel.com/blog/platforms-starter-kit",
    icon: <Megaphone width={18} />,
  },
  {
    name: "Documentação",
    href: process.env.NEXTAUTH_URL
      ? "http://doc.localhost:3000"
      : `https://doc.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    icon: <FileCode width={18} />,
  },
  {
    name: "Veja o site",
    href: "https://demo.vercel.pub",
    icon: <Layout width={18} />,
  },
];

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const tabs = useMemo(() => {
    console.log(segments[0])
    if (segments[0] === "conteudos" && segments[1] === "posts" && id) {
      return [
        {
          name: "Voltar para posts",
          href: `/conteudos/posts`,
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editor",
          href: `/conteudos/posts/${id}`,
          isActive: segments.length === 3,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Configurações",
          href: `/conteudos/posts/${id}/configuracoes`,
          isActive: segments.includes("configuracoes"),
          icon: <Settings width={18} />,
        },
      ];
    }
    else if (segments[0] === "conteudos") {
      return [
        {
          name: "Voltar para Visão Geral",
          href: `/`,
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Posts",
          href: `/${segments[0]}/posts`,
          isActive: segments.includes("posts"),
          icon: <Edit3 width={18} />,
        },
        {
          name: "Leis",
          href: `/${segments[0]}/leis`,
          isActive: segments.includes("leis"),
          icon: <Scale width={18} />,
        },
        {
          name: "Gastos",
          href: `/${segments[0]}/gastos`,
          isActive: segments.includes("gastos"),
          icon: <DollarSign width={18} />,
        },
        {
          name: "Eventos",
          href: `/${segments[0]}/eventos`,
          isActive: segments.includes("eventos"),
          icon: <CalendarDays width={18} />,
        },
        {
          name: "Moções",
          href: `/${segments[0]}/mocoes`,
          isActive: segments.includes("mocoes"),
          icon: <ScrollText width={18} />,
        },
        {
          name: "Pesquisas",
          href: `/${segments[0]}/pesquisas`,
          isActive: segments.includes("pesquisas"),
          icon: <ListChecks width={18} />,
        },
        {
          name: "Enquetes",
          href: `/${segments[0]}/enquetes`,
          isActive: segments.includes("enquetes"),
          icon: <Vote width={18} />,
        },
      ];
    }
    return [
      {
        name: "Visão Geral",
        href: "/",
        isActive: segments.length === 0,
        icon: <LayoutDashboard width={18} />,
      },
      {
        name: "Site",
        href: "/site",
        isActive: segments[0] === "site",
        icon: <Globe width={18} />,
      },

      {
        name: "Conteúdos",
        href: `/conteudos`,
        isActive: segments.includes("conteudos"),
        icon: <Newspaper width={18} />,
      },
      {
        name: "Estatísticas",
        href: `/estatisticas`,
        isActive: segments.includes("estatisticas"),
        icon: <BarChart3 width={18} />,
      },
      {
        name: "Configurações",
        href: "/configuracoes",
        isActive: segments[0] === "configuracoes",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, id]);

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <button
        className={`fixed z-20 ${
          // left align for Editor, right align for other pages
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
        } fixed z-10 flex h-full flex-col justify-between border-r border-stone-200 bg-stone-100 p-4 transition-all dark:border-stone-700 dark:bg-stone-900 sm:w-60 sm:translate-x-0`}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg px-2 py-1.5">
            <Link
              href={process.env.NEXTAUTH_URL
                ? "http://localhost:3000"
                : `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
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
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center space-x-3 ${
                  isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
                } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="grid gap-1">
            {externalLinks.map(({ name, href, icon }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <p>↗</p>
              </Link>
            ))}
          </div>
          <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
          {children}
        </div>
      </div>
    </>
  );
}
