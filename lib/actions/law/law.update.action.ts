"use server";

import { getSession } from "@/lib/auth";
import { Law } from "@prisma/client";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export const updateLaw = async (data: Law) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticatedNão autentificado",
    };
  }

  // Verifique se as propriedades essenciais não estão vazias
  if (!data.title || !data.description) {
    return {
      error: "Título, descrição, e conteúdo não podem estar vazios",
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: data.id,
    },
    include: {
      website: true,
    },
  });
  if (!post || post.userId !== session.user.id) {
    return {
      error: "Post não encontrado",
    };
  }

  try {
    const response = await prisma.law.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
      },
    });

    revalidateTag(
      `${post.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    revalidateTag(
      `${post.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    post.website?.customDomain &&
      (revalidateTag(`${post.website?.customDomain}-posts`),
      revalidateTag(`${post.website?.customDomain}-${post.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};