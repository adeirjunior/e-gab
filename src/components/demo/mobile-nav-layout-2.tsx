import { Cross } from "hamburger-react";
import { useState } from "react";

export default function MobileNavLayout2() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <div className="sm:hidden">
      <div className="sm:hidden">
        <Cross
          toggle={setOpen}
          toggled={isOpen}
          direction="right"
          size={20}
          color="#fff"
        />
      </div>
      <nav className={`${isOpen ? "" : "hidden"} `}>mobile-nav-layout-2</nav>
    </div>
  );
}
