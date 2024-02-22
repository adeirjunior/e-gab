"use client";

import { Button, Card, Image, Link } from "@nextui-org/react";
import { CldImage } from "next-cloudinary";

export default function Banner() {
  return (
    <Card className="relative">
      <div className="absolute inset-0 bg-white/75 sm:from-white/95 sm:to-white/25 sm:opacity-40 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
 <Image
            alt=""
            width={500}
            height={300}
            className="z-0 absolute top-0 bottom-0 left-0 right-0 object-cover"
            src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
      <div className="relative mx-auto w-full max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Let us find your
            <strong className="block font-extrabold text-rose-700">
              {" "}
              Forever Home.{" "}
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

         

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center">
            <Button
              as={Link}
              href="#"
              className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              Get Started
            </Button>

            <Button
              as={Link}
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
