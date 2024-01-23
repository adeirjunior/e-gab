import { navPaths } from "@/lib/data/navPaths";
import { Link } from "@nextui-org/react";

export default function DesktopNav() {
  return (
    <nav className="hidden sm:block">
      <ul className="m-0 flex gap-4 p-0">
        {navPaths.map(({ name, href }, index) => (
          <li key={index}>
            <Link className="text-white" href={href}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
