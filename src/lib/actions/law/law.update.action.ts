"use server";

import { withLawAuth } from "@/lib/auth";
import { Law, Website } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { nanoid } from "..";
import { put } from "@vercel/blob";
import { getBlurDataURL } from "@/lib/utils";
import { getSession } from "@/lib/auth/get-session";
import { hasSubscription } from "@/lib/helpers/billing";

export const updateLaw = async (data: Law) => {
  const hasSub = await hasSubscription();

  if (!hasSub) {
    return {
      error: `Você precisa assinar um plano para realizar este comando.`,
    };
  }

  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticatedNão autentificado",
    };
  }

  // Verifique se as propriedades essenciais não estão vazias
  if (!data.title || !data.description || !data.content) {
    return {
      error: "Título, descrição, e conteúdo não podem estar vazios",
    };
  }

  const law = await prisma.law.findUnique({
    where: {
      id: data.id,
    },
    include: {
      website: true,
    },
  });
  if (!law) {
    return {
      error: "Law não encontrado",
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
        content: data.content,
        published: data.published,
      },
    });

    revalidateTag(
      `${law.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-Laws`,
    );
    revalidateTag(
      `${law.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${law.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    law.website?.customDomain &&
      (revalidateTag(`${law.website?.customDomain}-Laws`),
      revalidateTag(`${law.website?.customDomain}-${law.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateLawMetadata = withLawAuth(
  async (
    formData: FormData,
    law: Law & {
      site: Website;
    },
    key: string,
  ) => {
    const value = formData.get(key) as string;

    try {
      let response;
      if (key === "image") {
        const file = formData.get("image") as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = await getBlurDataURL(url);

        response = await prisma.law.update({
          where: {
            id: law.id,
          },
          data: {
            image: url,
            imageBlurhash: blurhash,
          },
        });
      } else {
        response = await prisma.law.update({
          where: {
            id: law.id,
          },
          data: {
            [key]: key === "published" ? value === "true" : value,
          },
        });
      }

      revalidateTag(
        `${law.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-Laws`,
      );
      revalidateTag(
        `${law.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${law.slug}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      law.site?.customDomain &&
        (revalidateTag(`${law.site?.customDomain}-Laws`),
        revalidateTag(`${law.site?.customDomain}-${law.slug}`));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This slug is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);
