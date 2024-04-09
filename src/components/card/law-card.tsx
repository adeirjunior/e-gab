import BlurImage from "../arquives/blur-image";
import type { Law } from "@prisma/client";
import { placeholderBlurhash, toDateString } from "@/lib/utils";
import { Card, Link } from "@nextui-org/react";

interface LawCardProps {
  data: Law,
}

export default function LawCard({ data }: LawCardProps) {
  return (
    <Card as={Link} isPressable href={`leis/${data.slug}`}>
      <div className="ease overflow-hidden rounded-2xl border-2 border-stone-100 bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-stone-800 xl:flex">
        <BlurImage
          src={data.image!}
          alt={data.title ?? "Blog Post"}
          width={300}
          height={100}
          className="object-cover"
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <div className="h-full border-t border-stone-200 px-5 py-8 dark:border-stone-700 dark:bg-black xl:min-w-[900px]">
          <h3 className="font-title w-fit text-xl tracking-wide dark:text-white">
            {data.title}
          </h3>
          <p className="text-md my-2 truncate italic text-stone-600 dark:text-stone-400">
            {data.description}
          </p>
          <p className="my-2 w-fit text-sm text-stone-600 dark:text-stone-400">
            Publicado {toDateString(data.createdAt)}
          </p>
        </div>
      </div>
    </Card>
  );
}
