"use server";

import { unstable_cache } from "next/cache";
import prisma from "@/lib/configs/prisma";

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
  if (!userId) {
    console.error("User ID is undefined or null");
    return null;
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        politician: {
          include: {
            website: true,
          },
        },
        admin: {
          select: {
            website: true
          }
        },
      }, 
    });

    if (!user) {
      console.log("Usuário não encontrado.");
      return null;
    }

    const website = user.politician?.website || user.admin?.website;

    if (!website) {
      console.log("Usuário não tem um site associado.");
      return null;
    }

    return website;
  } catch (error) {
    console.error("Erro ao buscar o site:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getWebsiteBySubdomain(subdomain: string) {
  try {
    const website = await prisma.website.findUnique({
      where: { subdomain },
    });

    if (!website) {
      console.log("Website não encontrado.");
      return null;
    }

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
        politician: {
          include: {
            website: true,
          },
        },
      },
    });

    if (!user) {
      console.log("Usuário não encontrado.");
      return null;
    }

    const site = user.politician?.website;

    return site;
  } catch (error) {
    console.error("Erro ao obter o site do político:", error);
  } finally {
    await prisma.$disconnect();
  }
}

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
        include: { politician: true, admins: true },
      });
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}

export async function getAllWebsites() {
  try {
    const websites = await prisma.website.findMany({
      include: {
        laws: true,
        posts: true,
        chatRoom: true,
      }
    });

    if (!websites) {
      console.log("Websites não encontrados.");
      return null;
    }

    return websites;
  } catch (error) {
    console.error("Erro ao buscar o site:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}