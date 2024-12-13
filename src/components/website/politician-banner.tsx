"use client";

import { Button } from "@nextui-org/react";
import { Website } from "@prisma/client";
import { CldImage } from "next-cloudinary";

export default function PoliticianBanner({
  website,
}: {
  website: Website;
}) {
  return (
    <main className="relative flex h-[425px] w-full flex-col items-center justify-end bg-[#90CAFF]  sm:flex-row sm:justify-between sm:px-14">
      <div className="absolute -bottom-2 left-0 block h-[200px] w-full bg-gradient-to-t from-white to-transparent sm:hidden"></div>
      <CldImage
        width={250}
        height={250}
        alt={`Político`}
        src={website.politicianPhoto}
        className="select-none sm:static sm:h-full sm:w-auto"
      />
      <div className="max-w-96 space-y-6">
        <h2 className="absolute left-1/2 top-20 -translate-x-1/2 whitespace-nowrap text-center text-2xl font-extrabold uppercase text-white antialiased opacity-95 sm:static sm:translate-x-0 sm:text-start">
          {website.heroTitle!}
        </h2>
        <p className="hidden text-white sm:block">
          {website.heroDescription!}
        </p>
      </div>
    </main>
  );
}
