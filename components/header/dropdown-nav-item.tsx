import { NavItems } from "@/lib/data/demo-header";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { ReactNode, cloneElement } from "react";

export default function DropdownNavItem({
  items,
  children,
}: {
  items: NavItems[];
  children: ReactNode;
}) {
  return (
    <div className="relative inline-block">
      <Dropdown className="light">
        <DropdownTrigger>
          <Button
            type="button"
            className="font-saira hover:text-demoSecondary flex items-center uppercase text-gray-700 transition-all hover:underline hover:decoration-4 hover:underline-offset-4 sm:text-sm md:text-base lg:text-large"
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
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {items.map(({ Icon, href, name }, index) => (
            <DropdownItem key={index} as={Link} href={href} className="flex">
              {cloneElement(Icon)} {name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
