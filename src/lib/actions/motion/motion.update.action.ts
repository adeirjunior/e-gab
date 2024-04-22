"use server";

import { withLawAuth, withMotionAuth } from "@/lib/auth";
import { Law, PoliticianMotion, Website } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { nanoid } from "..";
import { getBlurDataURL } from "@/lib/utils";
import { getSession } from "@/lib/auth/get-session";
import { hasSubscription } from "@/lib/helpers/billing";

export const updateMotion = async (motion: PoliticianMotion) => {
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
  if (!motion.title || !motion.description ) {
    return {
      error: "Título, descrição, e conteúdo não podem estar vazios",
    };
  }

  const data = await prisma.politicianMotion.findUnique({
    where: {
      id: motion.id,
    },
    include: {
      website: true,
    },
  });
  if (!data) {
    return {
      error: "Law não encontrado",
    };
  }

  try {
    const response = await prisma.politicianMotion.update({
      where: {
        id: data.id,
      },
      data: {
        title: motion.title,
        description: motion.description,
        content: motion.content,
        published: motion.published,
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

export const updateMotionMetadata = withMotionAuth(
  async (
    formData: FormData,
    motion: PoliticianMotion & {
      website: Website;
    },
    key: string,
  ) => {
    const value = formData.get(key) as string;

    try {
      let response;
      if (key === "image") {
        const file = formData.get("image") as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const blurhash = await getBlurDataURL("");

        response = await prisma.politicianMotion.update({
          where: {
            id: motion.id,
          },
          data: {
            image: "",
            imageBlurhash: blurhash,
          },
        });
      } else {
        response = await prisma.politicianMotion.update({
          where: {
            id: motion.id,
          },
          data: {
            [key]: key === "published" ? value === "true" : value,
          },
        });
      }

      revalidateTag(
        `${motion.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-Laws`,
      );
      revalidateTag(
        `${motion.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${motion.slug}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      motion.website?.customDomain &&
        (revalidateTag(`${motion.website?.customDomain}-Laws`),
        revalidateTag(`${motion.website?.customDomain}-${motion.slug}`));

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
