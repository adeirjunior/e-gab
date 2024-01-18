"use server"

import { withPostAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Survey } from "@prisma/client";

export const deleteSurvey = withPostAuth(async (_: FormData, survey: Survey) => {
  try {
    const response = await prisma.survey.delete({
      where: {
        id: survey.id,
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
