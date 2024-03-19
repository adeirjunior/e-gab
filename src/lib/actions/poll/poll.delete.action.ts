"use server";

import { withPollAuth } from "@/lib/auth/poll.auth";
import prisma from "@/lib/configs/prisma";
import { Poll } from "@prisma/client";

export const deletePoll = withPollAuth(async (_: FormData, poll: Poll) => {
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
