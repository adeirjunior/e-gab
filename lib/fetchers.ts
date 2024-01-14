import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { serialize } from "next-mdx-remote/serialize";
import { replaceTweets } from "@/lib/remark-plugins";

export async function getSiteData(domain: string) {

  if (!domain) {
    // Trate o caso em que domain é undefined
    console.error("O parâmetro 'domain' não pode ser undefined.");
    return null; // ou lançar uma exceção, dependendo do seu caso
  }


  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.website.findUnique({
        where: subdomain ? { subdomain } : { customDomain: domain },
        include: { User: true },
      });
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}


export async function getPostsForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.post.findMany({
        where: {
          website: subdomain ? { subdomain } : { customDomain: domain },
          published: true,
        },
        select: {
          title: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    },
    [`${domain}-posts`],
    {
      revalidate: 900,
      tags: [`${domain}-posts`],
    },
  )();
}

export async function getPostData(domain: string, slug: string) {
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
          user: true
        },
      });

      if (!data) return {
        error: "Post está indefinido"
      };

      const [mdxSource, adjacentPosts] : any= await Promise.all([
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

async function getMdxSource(postContents: string) {
  // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
  // https://mdxjs.com/docs/what-is-mdx/#markdown
  const content =
    postContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";
  // Serialize the content string into MDX
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [replaceTweets],
    },
  });

  return mdxSource;
}

export const getSiteFromPostId = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      websiteId: true,
    },
  });
  return post?.websiteId;
};

export async function getWebsiteByUserId(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { Website: true }, // Certifique-se de que o relacionamento está correto no seu modelo
    });

    if (!user) {
      console.log("Usuário não encontrado.");
      return null;
    }

    const website = user.Website;

    if (!website) {
      console.log("Usuário não tem um site associado.");
      return null;
    }

    console.log("Site encontrado:", website);
    return website;
  } catch (error) {
    console.error("Erro ao buscar o site:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getPoliticianSiteByUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
            Website: {
              include: {
                User: true
              }
            }
      },
    });

    if (!user) {
      console.log("Usuário não encontrado.");
      return null;
    }

    const site = user.Website;

    return site;
  } catch (error) {
    console.error("Erro ao obter o site do político:", error);
  } finally {
    await prisma.$disconnect();
  }
}
