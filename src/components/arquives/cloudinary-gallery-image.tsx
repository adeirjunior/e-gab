"use client";

import { SearchResult } from "@/lib/types/types";
import CldImage from "../demo/cloudinary-image";
import { CldImageProps, CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

export function CloudinaryGalleryImage(
  props: {
    imageData: SearchResult;
  } & Omit<CldImageProps, "src">,
) {
  const { imageData } = props;

  return (
    <div className="relative">
      {imageData.resource_type === "video" ? (
        // @ts-ignore
        <CldVideoPlayer {...props} src={imageData.public_id} />
      ) : (
        <CldImage {...props} src={imageData.public_id} />
      )}
    </div>
  );
}
