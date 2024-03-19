"use server";

import { withEventAuth } from "@/lib/auth/event.auth";
import prisma from "@/lib/configs/prisma";
import { Event } from "@prisma/client";

export const deleteEvent = withEventAuth(async (_: FormData, event: Event) => {
  try {
    const response = await prisma.event.delete({
      where: {
        id: event.id,
      },
      select: {
        websiteId: true,
      },
    });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});
