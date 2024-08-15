"use server";

import prisma from "@/lib/configs/prisma";
import { hasSubscription } from "@/lib/helpers/billing";
import { getSession } from "@/lib/auth/get-session";
import { LegislativeIndication, Website } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { withLegislativeIndicationAuth } from "@/lib/auth";
import { getBlurDataURL } from "@/lib/utils";

export const updateLegislativeIndication = async (legislativeIndication: LegislativeIndication) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const hasSub = await hasSubscription();

  if (user?.role === "politician" && !hasSub) {
    return {
      error: `Você precisa assinar um plano para realizar este comando.`,
    };
  }

  // Verifique se as propriedades essenciais não estão vazias
  if (!legislativeIndication.title || !legislativeIndication.description) {
    return {
      error: "Título, descrição, e conteúdo não podem estar vazios",
    };
  }

  const data = await prisma.legislativeIndication.findUnique({
    where: {
      id: legislativeIndication.id,
    },
    include: {
      website: true,
    },
  });
  if (!data) {
    return {
      error: "Indicação legislativa não encontrado",
    };
  }

  try {
    const response = await prisma.legislativeIndication.update({
      where: {
        id: data.id,
      },
      data: {
        title: legislativeIndication.title,
        description: legislativeIndication.description,
        content: legislativeIndication.content,
        published: legislativeIndication.published,
      },
    });

    revalidateTag(
      `${data.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-Laws`,
    );
    revalidateTag(
      `${data.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${data.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    data.website?.customDomain &&
      (revalidateTag(`${data.website?.customDomain}-Laws`),
      revalidateTag(`${data.website?.customDomain}-${data.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};


export const updateLegislativeIndicationMetadata = withLegislativeIndicationAuth(
  async (
    formData: FormData,
    legislativeIndication: LegislativeIndication & {
      website: Website;
    },
    key: string,
  ) => {
    const value = formData.get(key) as string;

    try {
      let response;
      if (key === "image") {
        const blurhash = await getBlurDataURL("");

        response = await prisma.legislativeIndication.update({
          where: {
            id: legislativeIndication.id,
          },
          data: {
            image: "",
            imageBlurhash: blurhash,
          },
        });
      } else {
        response = await prisma.legislativeIndication.update({
          where: {
            id: legislativeIndication.id,
          },
          data: {
            [key]: key === "published" ? value === "true" : value,
          },
        });
      }

      revalidateTag(
        `${legislativeIndication.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-Laws`,
      );
      revalidateTag(
        `${legislativeIndication.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${legislativeIndication.slug}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      legislativeIndication.website?.customDomain &&
        (revalidateTag(`${legislativeIndication.website?.customDomain}-Laws`),
        revalidateTag(
          `${legislativeIndication.website?.customDomain}-${legislativeIndication.slug}`,
        ));

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
