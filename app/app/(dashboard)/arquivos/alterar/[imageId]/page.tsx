// @ts-nocheck

"use client";

import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

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

  const [pendingPrompt, setPendingPrompt] = useState("");
  const [prompt, setPrompt] = useState("");

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Edit {imageId}</h1>
        </div>

        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setTransformation(undefined)}>
            Clear All
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
          <CldImage src={imageId} width="400" height="300" alt="some image" />

          {transformation === "blur" && (
            <CldImage
              src={imageId}
              width="1200"
              height="1400"
              blur="800"
              alt="some image"
            />
          )}

          {transformation === "grayscale" && (
            <CldImage
              src={imageId}
              width="1200"
              height="1400"
              grayscale
              alt="some image"
            />
          )}

          {transformation === "pixelate" && (
            <CldImage
              src={imageId}
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
