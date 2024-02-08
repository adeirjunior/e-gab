"use client"

import Carousel from "@/components/Carousel";
import { ImageProps } from "@/lib/types/types";
import { useEffect, useState } from "react";

export default function CarouselWrapper({
  photoId,
  photo,
  blurDataUrl,
}: {
  photoId: string;
  photo: ImageProps;
  blurDataUrl: string;
}) {

  const currentPhoto = {
    ...photo,
    blurDataUrl,
  }

  return <Carousel currentPhoto={currentPhoto} index={Number(photoId)} />;
}