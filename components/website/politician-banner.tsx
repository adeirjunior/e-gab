"use client";

import { Button } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";

export default function PoliticianBanner({name, src}: {name: string; src: string;}) {
  return (
    <main className="absolute left-0 top-0 z-0 flex min-h-[425px] w-full flex-col items-center justify-end bg-[#90CAFF]">
      <div className="absolute bottom-0 left-0 h-[140px] w-full bg-gradient-to-t from-heroGradient"></div>
      <CldImage
        width={250}
        height={250}
        alt={`Vereador ${name}`}
        src={src}
        className=""
      />
      <h2 className="absolute left-1/2 top-20 w-[290px] -translate-x-1/2 text-center text-2xl font-extrabold uppercase text-white antialiased opacity-95">
        {name}
      </h2>
      <Button
        color="primary"
        radius="full"
        className="absolute bottom-0 -mb-5 px-6 text-xs"
      >
        Junte-se
      </Button>
    </main>
  );
}
