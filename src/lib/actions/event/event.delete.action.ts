"use server";

import { withEventAuth } from "@/lib/auth/event.auth";
import prisma from "@/lib/configs/prisma";

export const deleteEvent = withEventAuth(async (formData, event) => {
  try {
    return await prisma.event.delete({
      where: {
        id: event.id,
      }
    });
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});
