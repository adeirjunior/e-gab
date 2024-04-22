"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ImageGrid } from "@/components/arquives/image-grid";
import { SearchResult } from "@/lib/types/types";
import { CloudinarySelectImage } from "./cloudinary-select-image";

export default function SelectArchiveList({
  initialResources,
  setFile,
}: {
  initialResources: SearchResult[];
  setFile: Dispatch<SetStateAction<string>>;
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
          <CloudinarySelectImage
            setFile={setFile}
            key={imageData.public_id}
            width={1000}
            height={1000}
            imageData={imageData}
            loading="lazy"
            alt="an image of something"
          />
        );
      }}
    />
  );
}
