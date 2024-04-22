"use client";

import { useEffect, useState } from "react";
import { ImageGrid } from "@/components/arquives/image-grid";
import { CloudinaryImage } from "@/components/arquives/cloudinary-image";
import { SearchResult } from "@/lib/types/types";

export default function FavoritesList({
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
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            width="400"
            height="300"
            alt="an image of something"
            onUnheart={(unheartedResource) => {
              setResources((currentResources) =>
                currentResources.filter(
                  (resource) =>
                    resource.public_id !== unheartedResource.public_id,
                ),
              );
            }}
          />
        );
      }}
    />
  );
}
