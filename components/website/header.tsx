"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
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
import { Cross } from "hamburger-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Header({
  data,
  user,
}: {
  data: Website;
  user: {id: string, email: string}
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      position="static"
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white"
    >
      <NavbarContent>
        <NavbarBrand>
          <Link className="block text-teal-600" href="/">
            <span className="sr-only">Home</span>
            <Image
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
        <NavbarItem as={Link} href="/contato" isActive>
          Contato
        </NavbarItem>
        <NavbarItem as={Link} href="/posts">
            Posts
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {user?.id ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut({ redirect: false })}
              >
                Log Out
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
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent>
        <NavbarMenuToggle
          icon={<Cross onToggle={setIsMenuOpen} toggled={isMenuOpen} />}
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
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
