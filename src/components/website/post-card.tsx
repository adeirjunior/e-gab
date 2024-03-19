import { placeholderBlurhash } from "@/lib/utils";
import { Link } from "@nextui-org/react";
import { Post } from "@prisma/client";
import BlurImage from "../arquives/blur-image";

export default function PostCard({
  post,
}: {
  post: {
    description: string | null;
    image: string | null;
    imageBlurhash: string | null;
    createdAt: Date;
    title: string | null;
    slug: string;
  };
}) {
  return (
    <article className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
      <BlurImage
        alt={post.title ?? ""}
        blurDataURL={post.imageBlurhash ?? placeholderBlurhash}
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 group-hover:duration-300"
        width={1300}
        height={630}
        placeholder="blur"
        src={post.image ?? "/placeholder.png"}
      />

      <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
        <div className="p-4 sm:p-6">
          <time dateTime="2022-10-10" className="block text-xs text-white/90">
            {" "}
            10th Oct 2022{" "}
          </time>

          <Link href={`/posts/${post.slug}`}>
            <h3 className="mt-0.5 text-lg text-white">{post.title}</h3>
          </Link>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
            {post.description}
          </p>
        </div>
      </div>
    </article>
  );
}
