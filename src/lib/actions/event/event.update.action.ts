"use server";

import { getSession } from "@/lib/auth/get-session";
import { Event, Website } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { withEventAuth } from "@/lib/auth/event.auth";
import { nanoid } from "nanoid";
import { getBlurDataURL } from "@/lib/utils";

export const updateEvent = async (data: Event) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticatedNão autentificado",
    };
  }

  // Verifique se as propriedades essenciais não estão vazias
  if (
    !data.title ||
    !data.description ||
    !data.eventEnd ||
    !data.eventStart ||
    !data.location
  ) {
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
    const response = await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        eventStart: data.eventStart,
        eventEnd: data.eventEnd,
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


export const updateEventMetadata = withEventAuth(
  async (
    formData: FormData,
    event: Event & {
      website: Website;
    },
    key: string,
  ) => {
    const value = formData.get(key) as string;

    try {
      const response = await prisma.event.update({
          where: {
            id: event.id,
          },
          data: {
            [key]: key === "published" ? value === "true" : value,
          },
        });

      revalidateTag(
        `${event.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-events`,
      );
      revalidateTag(
        `${event.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${event.slug}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      event.website?.customDomain &&
        (revalidateTag(`${event.website?.customDomain}-events`),
        revalidateTag(`${event.website?.customDomain}-${event.slug}`));

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
