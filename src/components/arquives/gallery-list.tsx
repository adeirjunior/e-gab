"use client";

import { useEffect, useState } from "react";
import { ImageGrid } from "@/components/arquives/image-grid";
import { SearchResult } from "@/lib/types/types";
import { CloudinaryGalleryImage } from "./cloudinary-gallery-image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function GalleryList({
  initialResources,
}: {
  initialResources: SearchResult[];
}) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <ImageGrid
      images={resources}
      getImage={(imageData: SearchResult) => {
        return (
          <Zoom zoomMargin={20}>
            <CloudinaryGalleryImage
              key={imageData.public_id}
              width={1000}
              height={1000}
              imageData={imageData}
              loading="lazy"
              alt="an image of something"
            />
          </Zoom>
        );
      }}
    />
  );
}
