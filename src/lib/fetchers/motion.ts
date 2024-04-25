import { unstable_cache } from "next/cache";
import prisma from "@/lib/configs/prisma";
import { replaceTweets } from "@/lib/remark-plugins";
import { serialize } from "next-mdx-remote/serialize";

export async function getMdxSource(postContents: string) {
  const content =
    postContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [replaceTweets],
    },
  });

  return mdxSource;
}

export async function getMotionData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      const data = await prisma.politicianMotion.findFirst({
        where: {
          website: subdomain ? { subdomain } : { customDomain: domain },
          slug,
          published: true,
        },
        include: {
          user: true,
        },
      });

      if (!data || !data.content) {
        return {
          error: "Moção está indefinida",
        };
      }

      console.log(data);

      const [mdxSource, adjacentMotions] = await Promise.all([
        getMdxSource(data.content!),
        prisma.politicianMotion.findMany({
          where: {
            website: subdomain ? { subdomain } : { customDomain: domain },
            published: true,
            NOT: {
              id: data.id,
            },
          },
          select: {
            slug: true,
            title: true,
            createdAt: true,
            description: true,
            image: true,
            imageBlurhash: true,
          },
        }),
      ]);

      return {
        ...data,
        mdxSource,
        adjacentMotions,
      };
    },
    [`${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`${domain}-${slug}`],
    },
  )();
}

export async function getMotionsForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.politicianMotion.findMany({
        where: {
          website: subdomain ? { subdomain } : { customDomain: domain },
          published: true,
        },
        select: {
          id: true,
          title: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    },
    [`${domain}-motions`],
    {
      revalidate: 900,
      tags: [`${domain}-motions`],
    },
  )();
}
