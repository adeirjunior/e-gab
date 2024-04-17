"use client";

import { SearchResult } from "@/lib/types/types";
import CldImage from "../demo/cloudinary-image";
import { CldImageProps, CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import { Card } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

export function CloudinarySelectImage(
  props: {
    imageData: SearchResult;
    setFile: Dispatch<SetStateAction<string>>;
  } & Omit<CldImageProps, "src">,
) {
  const { imageData, setFile } = props;

  return (
    <Card
      onPress={() => setFile(imageData.public_id)}
      isPressable
      radius="sm"
      className="relative"
    >
      {imageData.resource_type === "video" ? (
        // @ts-ignore
        <CldVideoPlayer {...props} src={imageData.public_id} />
      ) : (
        <CldImage {...props} src={imageData.public_id} />
      )}
    </Card>
  );
}
