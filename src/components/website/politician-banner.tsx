"use client";

import { Button } from "@nextui-org/react";
import { Politician, User, Website } from "@prisma/client";
import { CldImage } from "next-cloudinary";

export default function PoliticianBanner({
  website,
  politician,
}: {
  website: Website;
  politician: Politician & { user: User };
}) {
  return (
    <main className="relative flex h-[425px] w-full flex-col items-center justify-end bg-[#90CAFF]  sm:flex-row sm:justify-between sm:px-14">
      <div className="absolute -bottom-2 left-0 block h-[200px] w-full bg-gradient-to-t from-white to-transparent sm:hidden"></div>
      <CldImage
        width={250}
        height={250}
        alt={`Vereador ${politician.user.name}`}
        src={website.politicianPhoto}
        className="select-none sm:static sm:h-full sm:w-auto"
      />
      <div className="max-w-96 space-y-6">
        <h2 className="absolute left-1/2 top-20 -translate-x-1/2 text-center text-2xl font-extrabold uppercase text-white antialiased opacity-95 sm:static sm:translate-x-0 sm:text-start whitespace-nowrap">
          {website.heroTitle}
        </h2>
        <h3 className="hidden sm:block text-white">{website.heroDescription}</h3>
        <Button
          color="primary"
          radius="full"
          className="absolute left-1/2 -translate-x-1/2 -bottom-7 px-6 text-xs sm:translate-x-0 sm:m-0 sm:static sm:text-xl font-bold"
        >
          Junte-se
        </Button>
      </div>
    </main>
  );
}
