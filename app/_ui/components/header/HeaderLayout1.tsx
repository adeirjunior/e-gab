import Layout1Logo from "../icons/Layout1Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function HeaderLayout1() {
  return (
    <header className="flex fixed sm:absolute top-0 left-0 justify-between items-center px-4 py-2 bg-[#00000082] backdrop-blur-md uppercase text-white w-full z-20">
      <div className="flex justify-between items-center w-fit">
        <Layout1Logo className="absolute z-40 left-5 top-0 sm:static" />
      </div>

      <div>
        <MobileNav />
        <DesktopNav />
      </div>
    </header>
  );
}
