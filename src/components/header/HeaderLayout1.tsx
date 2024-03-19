import Layout1Logo from "../icons/Layout1Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function HeaderLayout1() {
  return (
    <header className="fixed left-0 top-0 z-20 flex w-full items-center justify-between bg-[#00000082] px-4 py-2 uppercase text-white backdrop-blur-md sm:absolute">
      <div className="flex w-fit items-center justify-between">
        <Layout1Logo className="absolute left-5 top-0 z-40 sm:static" />
      </div>

      <div>
        <MobileNav />
        <DesktopNav />
      </div>
    </header>
  );
}
