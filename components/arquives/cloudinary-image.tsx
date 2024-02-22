"use client";

import { SearchResult } from "@/lib/types/types";
import CldImage from "../demo/cloudinary-image";
import { CldImageProps, CldVideoPlayer } from "next-cloudinary";
import { useState, useTransition } from "react";
import { FullHeart } from "../icons/full-heart";
import { setAsFavoriteAction } from "@/lib/actions/image/image.create.action";
import { Heart } from "../icons/heart";
import { ImageMenu } from "./image-menu";
import "next-cloudinary/dist/cld-video-player.css";

export function CloudinaryImage(
  props: {
    imageData: SearchResult;
    onUnheart?: (unheartedResource: SearchResult) => void;
  } & Omit<CldImageProps, "src">,
) {
  const [transition, startTransition] = useTransition();

  const { imageData, onUnheart } = props;

  const [isFavorited, setIsFavorited] = useState(
    imageData.tags.includes("favorite"),
  );

  console.log('Dados da Imagem: ',imageData)
  return (
    <div className="relative">
      {imageData.resource_type === "video" ? (
        <div className="w-2 h-2"></div>
      ) : (
        <CldImage {...props} src={imageData.public_id} />
      )}

      {isFavorited ? (
        <FullHeart
          onClick={() => {
            onUnheart?.(imageData);
            setIsFavorited(false);
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, false);
            });
          }}
          className="absolute left-2 top-2 cursor-pointer text-red-500 hover:text-white"
        />
      ) : (
        <Heart
          onClick={() => {
            setIsFavorited(true);
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, true);
            });
          }}
          className="absolute left-2 top-2 cursor-pointer hover:text-red-500"
        />
      )}
      <ImageMenu image={imageData} />
    </div>
  );
}
