"use client"

import Carousel from "@/components/Carousel";
import { ImageProps } from "@/lib/types/types";

export default function CarouselWrapper({
  photoId,
  photo,
}: {
  photoId: string;
  photo: ImageProps;
}) {

  const currentPhoto = {
    ...photo,
  }

  return <Carousel currentPhoto={currentPhoto} index={Number(photoId)} />;
}