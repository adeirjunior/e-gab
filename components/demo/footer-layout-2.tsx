import { Link } from "@nextui-org/react";
import CldImage from "./cloudinary-image";

export default function FooterLayout2() {
  return (
    <div className="px-6 py-4 bg-gradient-to-tb from-blue-600 to-blue-300">
      <Link href="/">
        <CldImage
          alt=""
          width={200}
          height={100}
          src="E-Gab/Demo/bqog03j40xuqadomsdfb"
        />
      </Link>
    </div>
  );
}
