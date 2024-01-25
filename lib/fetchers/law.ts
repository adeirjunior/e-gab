import { unstable_cache } from "next/cache";
import prisma from "@/lib/configs/prisma";

import editorJsHtml from "editorjs-html";
const EditorJsToHtml = editorJsHtml();

export async function getLawData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      const data = await prisma.post.findFirst({
        where: {
          website: subdomain ? { subdomain } : { customDomain: domain },
          slug,
          published: true,
        },
        include: {
          user: true,
          content: {
            include: {
              blocks: true,
            },
          },
        },
      });

      if (!data)
        return {
          error: "Lei está indefinida",
        };

      const [mdxSource, adjacentPosts]: any = await Promise.all([
        EditorJsToHtml.parse(data.content as any),
        prisma.law.findMany({
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
        adjacentPosts,
      };
    },
    [`${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`${domain}-${slug}`],
    },
  )();
}
