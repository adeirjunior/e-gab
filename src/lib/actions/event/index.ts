"use server";

import { getSession } from "@/lib/auth/get-session";
import { Event, EventLocation, User } from "@prisma/client";
import prisma from "@/lib/configs/prisma";

export const toggleEventConnection = async (
  userId: string,
  event: Event & {
    location: EventLocation;
  },
) => {
  const session = await getSession();

  if (!session?.user.id) {
    return {
      error: "Not authenticatedNão autentificado",
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

    let response: Event & {usersWhoSubscripted: User[]};

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
        include: {
            usersWhoSubscripted: true
        }
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
        include: {
            usersWhoSubscripted: true
        }
      });
    }

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
