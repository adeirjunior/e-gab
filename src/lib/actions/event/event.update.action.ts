"use server";

import { getSession } from "@/lib/auth/get-session";
import { Event, Website } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { withEventAuth } from "@/lib/auth/event.auth";

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
    !data.description
  ) {
    return {
      error: "Título, descrição, e conteúdo não podem estar vazios",
    };
  }

  const event = await prisma.event.findUnique({
    where: {
      id: data.id,
    },
    include: {
      website: true,
    },
  });
  if (!event) {
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
        eventStartDay: data.eventStartDay,
        eventEndDay: data.eventEndDay,
        eventStartHour: data.eventStartHour,
        eventEndHour: data.eventEndHour
      },
    });

    revalidateTag(
      `${event.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    revalidateTag(
      `${event.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${event.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    event.website?.customDomain &&
      (revalidateTag(`${event.website?.customDomain}-posts`),
      revalidateTag(`${event.website?.customDomain}-${event.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const toggleEventConnection = async (
  userId: string | null,
  event: Event & {
    website: Website;
  } | null
) => {
  const session = await getSession();

  if (!session?.user.id) {
    return {
      error: "Not authenticatedNão autentificado",
    };
  }

  // Verifique se as propriedades essenciais não estão vazias
  if (!event || !userId) {
    return {
      error: "Conteúdo faltando",
    };
  }

  try {
    // Check if the user is already connected to the event
    const existingEvent = await prisma.event.findUnique({
      where: {
        id: event.id,
      },
      select: {
        usersWhoSubscripted: {
          where: {
            id: userId,
          },
        },
      },
    });

    let response: Event;

    if (existingEvent && existingEvent.usersWhoSubscripted.length > 0) {
      // If user is already connected, disconnect them
      response = await prisma.event.update({
        where: {
          id: event.id,
        },
        data: {
          usersWhoSubscripted: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
    } else {
      // If user is not connected, connect them
      response = await prisma.event.update({
        where: {
          id: event.id,
        },
        data: {
          usersWhoSubscripted: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

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
