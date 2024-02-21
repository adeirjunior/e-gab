"use client"

import { Button } from '@nextui-org/react';
import { CldImage } from 'next-cloudinary';

export default function PoliticianBanner() {
  return (
    <main className="absolute top-0 left-0 flex min-h-[425px] w-full flex-col items-center justify-end bg-[#90CAFF] z-0">
        <div className="absolute bottom-0 left-0 h-[140px] w-full bg-gradient-to-t from-heroGradient"></div>
        <CldImage
          width={250}
          height={250}
          alt="Vereador Claudinho da Cascalheira"
          src="E-Gab/Demo/t508ukdln5gw6cquveu4"
          className=""
        />
        <h2 className='absolute top-20 left-1/2 -translate-x-1/2 w-[290px] text-center text-2xl uppercase font-extrabold antialiased text-white opacity-95'>Claudinho da Cascalheira</h2>
        <Button
          color="primary"
          radius="full"
          className="absolute px-6 bottom-0 -mb-5 text-xs"
        >
          Junte-se
        </Button>
      </main>
  );
}