"use server";

import { withSurveyAuth } from "@/lib/auth/survey.auth";
import prisma from "@/lib/configs/prisma";
import { Survey } from "@prisma/client";

export const deleteSurvey = withSurveyAuth(
  async (_: FormData, survey: Survey) => {
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
  },
);
