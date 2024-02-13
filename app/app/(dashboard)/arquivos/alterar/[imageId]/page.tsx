// @ts-nocheck

"use client";

import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

function extractLastPartOfPath(link: string): string | null {
    try {
        const lastSlashIndex = link.lastIndexOf("/");
        if (lastSlashIndex !== -1) {
            const lastPartOfPath = link.substring(lastSlashIndex + 1);
            return lastPartOfPath;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error while extracting the last part of the path:", error);
        return null;
    }
}


export default function EditPage({
  params: { imageId },
}: {
  params: {
    imageId: string;
  };
}) {
  const [transformation, setTransformation] = useState<
    | undefined
    | "generative-fill"
    | "blur"
    | "grayscale"
    | "pixelate"
    | "bg-remove"
  >();

  const decodedImageId = decodeURIComponent(imageId)

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Alterar {extractLastPartOfPath(decodedImageId)}</h1>
        </div>

        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setTransformation(undefined)}>
            Limpar
          </Button>

          <Button onClick={() => setTransformation("blur")}>Borrar</Button>

          <Button onClick={() => setTransformation("grayscale")}>
            Preto e Branco
          </Button>

          <Button onClick={() => setTransformation("pixelate")}>
            Pixelizar
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <CldImage
            src={decodedImageId}
            width="400"
            height="300"
            alt="some image"
          />

          {transformation === "blur" && (
            <CldImage
              src={decodedImageId}
              width="1200"
              height="1400"
              blur="800"
              alt="some image"
            />
          )}

          {transformation === "grayscale" && (
            <CldImage
              src={decodedImageId}
              width="1200"
              height="1400"
              grayscale
              alt="some image"
            />
          )}

          {transformation === "pixelate" && (
            <CldImage
              src={decodedImageId}
              width="1200"
              height="1400"
              pixelate
              alt="some image"
            />
          )}
        </div>
      </div>
    </section>
  );
}
