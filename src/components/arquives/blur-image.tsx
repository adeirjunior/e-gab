"use client";

import cn from "clsx";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

import type { ComponentProps } from "react";

export default function BlurImage(props: ComponentProps<typeof CldImage>) {
  const [isLoading, setLoading] = useState(true);

  return (
    <CldImage
      {...props}
      alt={props.alt}
      className={cn(
        props.className,
        "duration-700 ease-in-out",
        isLoading ? "scale-105 blur-lg" : "scale-100 blur-0",
      )}
      onLoad={() => setLoading(false)}
    />
  );
}
