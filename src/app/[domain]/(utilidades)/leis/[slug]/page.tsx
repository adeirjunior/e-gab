import { notFound } from "next/navigation";
import prisma from "@/lib/configs/prisma";
import { getSiteData } from "@/lib/fetchers/site";
import { getLawData } from "@/lib/fetchers/law";
import BlogCard from "@/components/card/blog-card";
import BlurImage from "@/components/arquives/blur-image";
import MDX from "@/components/mdx";
import { placeholderBlurhash, toDateString } from "@/lib/utils";
import "./style.css";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const [data, siteData] = await Promise.all([
    getLawData(domain, slug),
    getSiteData(domain),
  ]);
  if (!data || !siteData) {
    return null;
  }
  if ("error" in data) {
    return null;
  }
  const { title, description } = data;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vercel",
    },
  };
}

export async function generateStaticParams() {
  const allLaws = await prisma.law.findMany({
    select: {
      slug: true,
      website: {
        select: {
          subdomain: true,
          customDomain: true,
        },
      },
    },
    // feel free to remove this filter if you want to generate paths for all posts
    where: {
      website: {
        subdomain: "demo",
      },
    },
  });

  const allPaths = allLaws
    .flatMap(({ website, slug }) => [
      website?.subdomain && {
        domain: `${website.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        slug,
      },
      website?.customDomain && {
        domain: website.customDomain,
        slug,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SiteLawPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const data = await getLawData(domain, slug);

  if ("error" in data) {
    console.log(data);
    notFound();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="m-auto w-full space-y-6 text-center md:w-7/12">
          <p className="m-auto mb-5 w-10/12 text-sm font-light text-stone-500 dark:text-stone-400 md:text-base">
            {toDateString(data.createdAt)}
          </p>
          <h1 className="font-title text-3xl font-bold text-stone-800 md:text-6xl">
            {data.title}
          </h1>
          <p className="text-md mx-auto w-10/12 text-stone-600  md:text-lg">
            {data.description}
          </p>
        </div>
      </div>
      <div className="md:h-150 relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:mb-20 md:w-5/6 md:rounded-2xl lg:w-2/3">
        <BlurImage
          alt={data.title ?? "Law image"}
          width={1200}
          height={630}
          className="h-full w-full object-cover"
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          src={data.image ?? "/placeholder.png"}
        />
      </div>

      <MDX source={data.mdxSource} />

      {data.adjacentPosts.length > 0 && (
        <div className="relative mb-20 mt-10 sm:mt-20">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-stone-300 dark:border-stone-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-stone-500 dark:bg-black dark:text-stone-400">
              Continue lendo
            </span>
          </div>
        </div>
      )}
      {data.adjacentPosts && (
        <div className="mx-5 mb-20 grid max-w-screen-xl grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3">
          {data.adjacentPosts.map((data: any, index: number) => (
            <BlogCard key={index} data={data} />
          ))}
        </div>
      )}
    </>
  );
}
