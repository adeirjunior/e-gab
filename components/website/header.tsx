"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { Website } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header({ data }: { data: Website }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const menuItems = [
    { title: "Agenda", href: "/agenda" },
    { title: "Bibliografia", href: "/bibliografia" },
    { title: "Emendas", href: "/emendas" },
    { title: "Galeria", href: "/galeria" },
    { title: "Projetos", href: "/projetos" },
    { title: "Leis", href: "/leis" },
    { title: "Ouvidoria", href: "/ouvidoria" },
    { title: "Enquetes", href: "/enquetes" },
    { title: "Pesquisas", href: "/pesquisas" },
    { title: "Contato", href: "/contato" },
    { title: "Posts", href: "/posts" },
  ];

  return (
    <>
      <div className="h-20 w-2"></div>
      <Navbar
        position="static"
        onMenuOpenChange={setIsMenuOpen}
        className="absolute left-0 top-0 z-40 bg-white"
      >
        <NavbarContent>
          <NavbarBrand>
            <Link className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <CldImage
                alt={`logo de ${data.name}`}
                src={data.logo}
                width={50}
                height={50}
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                  radius="sm"
                  variant="light"
                >
                  Parlamentar
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                as={Link}
                href="/agenda"
                key="autoscaling"
                description="ACME scales apps to meet user demand, automagically, based on load."
              >
                Agenda
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/bibliografia"
                key="usage_metrics"
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              >
                Bibliografia
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/emendas"
                key="production_ready"
                description="ACME runs on ACME, join us and others serving requests at web scale."
              >
                Emendas
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/galeria"
                key="99_uptime"
                description="Applications stay on the grid with high availability and high uptime guarantees."
              >
                Galeria
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/projetos"
                key="99_utime"
                description="Applications stay on the grid with high availability and high uptime guarantees."
              >
                Projetos
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="bg-transparent p-0 data-[hover=true]:bg-transparent"
                  radius="sm"
                  variant="light"
                >
                  Utilidades
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                as={Link}
                href="/enquetes"
                key="autoscaling"
                description="ACME scales apps to meet user demand, automagically, based on load."
              >
                Enquetes
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/leis"
                key="usage_metrics"
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              >
                Leis
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/ouvidoria"
                key="production_ready"
                description="ACME runs on ACME, join us and others serving requests at web scale."
              >
                Ouvidoria
              </DropdownItem>
              <DropdownItem
                as={Link}
                href="/pesquisas"
                key="99_uptime"
                description="Applications stay on the grid with high availability and high uptime guarantees."
              >
                Pesquisas
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem isActive>
            <Button
              as={Link}
              disableRipple
              className="bg-transparent p-0 data-[hover=true]:bg-transparent"
              radius="sm"
              variant="light"
              href="/contato"
            >
              Contato
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              disableRipple
              className="bg-transparent p-0 data-[hover=true]:bg-transparent"
              radius="sm"
              variant="light"
              href="/posts"
            >
              Posts
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          {status === "authenticated" ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <CldImage
                  alt=""
                  className="rounded-full transition-transform"
                  width={50}
                  height={50}
                  src={session.user.image!}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Entrou como</p>
                  <p className="font-semibold">{session.user?.email}</p>
                </DropdownItem>
                <DropdownItem as={Link} href="/perfil" key="profile">
                  Perfil
                </DropdownItem>
                <DropdownItem as={Link} href="/configuracoes" key="settings">
                  Configurações
                </DropdownItem>
                <DropdownItem as={Link} href="/notificacoes" key="notification">
                  Notificações
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  href="/documentacao"
                  key="documentation"
                >
                  Documentação
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() =>
                    signOut({ redirect: false }).finally(() => router.push("/"))
                  }
                >
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <NavbarItem className="hidden lg:flex">
                <Link
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  href="/login"
                >
                  Login
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                  color="primary"
                  href="/signup"
                  variant="flat"
                >
                  Registrar
                </Button>
              </NavbarItem>
            </>
          )}
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                className="w-full"
                href={item.href}
                size="lg"
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
