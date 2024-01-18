"use server";

import { withPostAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Poll } from "@prisma/client";

export const deletePoll = withPostAuth(async (_: FormData, poll: Poll) => {
  try {
    const response = await prisma.poll.delete({
      where: {
        id: poll.id,
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
