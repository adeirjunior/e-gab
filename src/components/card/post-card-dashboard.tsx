import BlurImage from "@/components/arquives/blur-image";
import { getCurrentDomain, placeholderBlurhash } from "@/lib/utils";
import { Post, Website } from "@prisma/client";
import Link from "next/link";
import DomainLinkTag from "../domain-link-tag";
import { Card } from "@nextui-org/react";

export default function PostCard({
  data,
}: {
  data: Post & { website: Website | null };
}) {
  return (
    <Card isPressable className="relative rounded-lg border-3 border-stone-200 pb-10 shadow-md transition-all dark:bg-black hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={`/conteudos/posts/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <div className="relative h-44 overflow-hidden">
          <BlurImage
            alt={data.title ?? "Card thumbnail"}
            width={500}
            height={400}
            className="h-full object-cover"
            src={data.image ?? "/placeholder.png"}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
          {!data.published && (
            <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
              Esboço
            </span>
          )}
        </div>
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="font-cal my-0 truncate text-xl font-bold tracking-wide dark:text-white">
            {data.title}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description}
          </p>
        </div>
      </Link>
      <div className="absolute bottom-4 flex w-full px-4">
        <DomainLinkTag
          subdomain={data.website?.subdomain!}
          path={`/posts/${data.slug}`}
        />
      </div>
    </Card>
  );
}
