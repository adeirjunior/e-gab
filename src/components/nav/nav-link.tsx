import { Link } from "@nextui-org/react";

export const NavLink = ({
  name,
  href,
  isActive,
  Icon,
  external = false,
}: {
  name: string;
  href: string;
  isActive?: boolean;
  Icon: JSX.Element;
  external?: boolean;
}) => (
  <Link
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    className={`flex items-center space-x-3 ${
      isActive ? "bg-stone-200 text-black dark:bg-stone-700" : ""
    } rounded-lg px-2 py-1.5 transition-all duration-150 ease-in-out hover:bg-stone-200 active:bg-stone-300 dark:text-white dark:hover:bg-stone-700 dark:active:bg-stone-800`}
  >
    {Icon}
    <span className="text-sm font-medium">{name}</span>
    {external && <p>↗</p>}
  </Link>
);
