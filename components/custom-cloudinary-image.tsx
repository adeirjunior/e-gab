'use client'

import { Image, ImageProps } from "@nextui-org/react";
import NextImage, {ImageProps as NextImageProps} from "next/image";

const normalizeSrc = (src: string) => (src[0] === "/" ? src.slice(1) : src);

export function cloudinaryLoader({ src, width, quality }: any) {
  const params = [
    "f_auto",
    "c_limit",
    "w_" + width,
    "q_" + (quality || "auto"),
  ];
  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/${params.join(",")}/${normalizeSrc(src)}`;
}

export default function CustomCldImage(props: ImageProps & NextImageProps) {
  return (
    <Image
      {...props}
      as={NextImage}
      alt={props.alt}
      width={props.width}
      height={props.height}
      loader={cloudinaryLoader}
      src={props.src}
    />
  );
}