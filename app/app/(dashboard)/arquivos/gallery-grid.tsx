"use client";

import { ImageGrid } from "@/components/image-grid";
import { CloudinaryImage } from "@/components/cloudinary-image";
import { SearchResult } from "@/lib/types/types";

export default function GalleryGrid({
  images,
  websiteCloudinaryDir,
}: {
  images: SearchResult[];
  websiteCloudinaryDir: string;
}) {
  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="400"
            height="300"
            alt="an image of something"
          />
        );
      }}
    />
  );
}
