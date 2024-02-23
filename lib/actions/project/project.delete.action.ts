"use server";

import { withProjectAuth } from "@/lib/auth";
import prisma from "@/lib/configs/prisma";
import { PoliticalProject } from "@prisma/client";

export const deleteProject = withProjectAuth(
  async (_: FormData, project: PoliticalProject) => {
    try {
      const response = await prisma.politicalProject.delete({
        where: {
          id: project.id,
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
