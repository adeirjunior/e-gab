"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import CldImage from "./cloudinary-image";
import { Mail } from "lucide-react";
import "./style.css";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuItems = [
    {
      name: "Parlamentar",
      children: [
        {
          name: "Agenda",
          href: "agenda",
        },
        {
          name: "Bibliografia",
          href: "bibliografia",
        },
        {
          name: "Emendas",
          href: "emendas",
        },
        {
          name: "Galeria",
          href: "galeria",
        },
        {
          name: "Projetos",
          href: "projetos",
        },
      ],
    },
    {
      name: "Utilidades",
      children: [
        {
          name: "Enquetes",
          href: "enquetes",
        },
        {
          name: "Leis",
          href: "leis",
        },
        {
          name: "Ouvidoria",
          href: "ouvidoria",
        },
        {
          name: "Pesquisas",
          href: "pesquisas",
        },
      ],
    },
    {
      name: "Contato",
      href: "contato",
    },
    {
      name: "Posts",
      href: "posts",
    },
  ];

  return (
    <Navbar
      className="absolute bg-transparent"
      isBlurred={false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <NavbarBrand>
          <Link href="/">
            {" "}
            <CldImage
              alt=""
              width={200}
              height={100}
              src="E-Gab/Demo/bqog03j40xuqadomsdfb"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarBrand>
          <Link href="/">
            <CldImage
              alt=""
              width={200}
              height={100}
              src="E-Gab/Demo/bqog03j40xuqadomsdfb"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="hidden bg-transparent p-0 data-[hover=true]:bg-transparent sm:block"
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
            <DropdownItem href="/agenda" key="autoscaling">
              Agenda
            </DropdownItem>
            <DropdownItem href="/bibliografia" key="usage_metrics">
              Bibliografia
            </DropdownItem>
            <DropdownItem href="/emendas" key="production_ready">
              Emendas
            </DropdownItem>
            <DropdownItem href="/galeria" key="99_uptime">
              Galeria
            </DropdownItem>
            <DropdownItem href="/projetos" key="supreme_support">
              Projetos
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="hidden bg-transparent p-0 data-[hover=true]:bg-transparent sm:block"
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
            <DropdownItem href="/enquetes" key="autoscaling">
              Enquetes
            </DropdownItem>
            <DropdownItem href="/leis" key="usage_metrics">
              Leis
            </DropdownItem>
            <DropdownItem href="/ouvidoria" key="production_ready">
              Ouvidoria
            </DropdownItem>
            <DropdownItem href="/pesquisas" key="99_uptime">
              Pesquisas
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem className="hidden sm:block">
          <Link color="foreground" href="/contato">
            Contato
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:block">
          <Link color="foreground" href="/posts">
            Posts
          </Link>
        </NavbarItem>
        <Mail color="#fff" />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            {item.children ? (
              <>
                <NavbarMenuItem>
                  <Accordion isCompact variant="light">
                    <AccordionItem
                      key="1"
                      aria-label="Accordion 1"
                      title={item.name}
                    >
                        {item.children.map((child, childIndex) => (
                          <NavbarMenuItem key={`${child}-${childIndex}`}>
                            <Link
                              className="w-full"
                              color="foreground"
                              href={`#${child.href}`}
                              size="lg"
                            >
                              {child.name}
                            </Link>
                          </NavbarMenuItem>
                        ))}
                    </AccordionItem>
                  </Accordion>
                </NavbarMenuItem>
              </>
            ) : (
              <Link
                className="w-full px-2"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={`#${item.href}`}
                size="lg"
              >
                {item.name}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
