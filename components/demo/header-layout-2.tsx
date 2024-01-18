"use client"

import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import CldImage from "./cloudinary-image";
import { Mail } from "lucide-react";
import "./style.css"

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
      name: "utilidades",
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
      className="absolute bg-[#90c9ff1b]"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand>
          <CldImage
            alt=""
            width={200}
            height={100}
            src="E-Gab/Demo/bqog03j40xuqadomsdfb"
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarBrand>
          <CldImage
            alt=""
            width={200}
            height={100}
            src="E-Gab/Demo/bqog03j40xuqadomsdfb"
          />
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <Mail color="#fff" />
      </NavbarContent>

      <NavbarMenu className="bg-[#90c9ff1b]">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            {item.children ? (
              <>
                <Link
                  className="w-full"
                  color={
                    index === 2
                      ? "warning"
                      : index === menuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.name}
                </Link>
                <NavbarMenu>
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
                </NavbarMenu>
              </>
            ) : (
              <Link
                className="w-full"
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
