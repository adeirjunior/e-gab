"use server"

import { withPostAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Event } from "@prisma/client";

export const deleteEvent = withPostAuth(async (_: FormData, event: Event) => {
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
