"use client";

import { ImageGrid } from "@/components/arquives/image-grid";
import { CloudinaryImage } from "@/components/arquives/cloudinary-image";
import { SearchResult } from "@/lib/types/types";

export default function AlbumGrid({ images }: { images: SearchResult[] }) {
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
