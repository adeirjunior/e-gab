"use client";

import Modal from "@/components/modal/ModalC";
import { useLastViewedPhoto } from "@/lib/utils/useLastViewedPhoto";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { ImageProps } from "@/lib/types/types";
import { Image } from "@nextui-org/react";

export default function Gallery({ results }: { results: any }) {
  const searchParams = useSearchParams();
  const [images, setImages] = useState<ImageProps[]>([]);
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  const photoId = searchParams.get("photoId");

  useEffect(() => {
    const newImages = results.resources.map((result: any, i: number) => ({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    }));

    setImages(newImages);
  }, [results.resources]);

  useEffect(() => {
    if (lastViewedPhoto && !photoId && lastViewedPhotoRef.current) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <div>
      {photoId && (
        <Modal
          images={images}
          onClose={() => {
            setLastViewedPhoto(photoId as any);
          }}
        />
      )}
      {images.map(({ id, public_id, format }) => (
        <Link
          key={id}
          href={`/arquivos?photoId=${id}`}
          as={`/arquivos/f/${id}`}
          ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
          shallow
          className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
        >
          <Image
            alt="Next.js Conf photo"
            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
            style={{ transform: "translate3d(0, 0, 0)" }}
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
            width={720}
            height={480}
            sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
          />
        </Link>
      ))}
    </div>
  );
}
