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

export async function getLegislativeIndicationData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      const data = await prisma.legislativeIndication.findFirst({
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
          error: "Indicação legislativa está indefinida",
        };
      }

      const [mdxSource, adjacentLegislativeIndication] = await Promise.all([
        getMdxSource(data.content!),
        prisma.post.findMany({
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
        adjacentLegislativeIndication,
      };
    },
    [`${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`${domain}-${slug}`],
    },
  )();
}

export async function getLegislativeIndicationForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.legislativeIndication.findMany({
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
          updatedAt: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    },
    [`${domain}-legislative-indication`],
    {
      revalidate: 900,
      tags: [`${domain}-legislative-indication`],
    },
  )();
}
