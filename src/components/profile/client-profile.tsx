"use client";

import { CldImage, CldImageProps } from "next-cloudinary";

export default function ClientProfile(props: CldImageProps) {
  return (
      <CldImage
        {...props}
        width={160}
        height={160}
      />
  );
}
