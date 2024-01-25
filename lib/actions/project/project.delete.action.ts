"use server";

import { withPostAuth } from "@/lib/auth";
import prisma from "@/lib/configs/prisma";
import { Project } from "@prisma/client";

export const deleteProject = withPostAuth(
  async (_: FormData, project: Project) => {
    try {
      const response = await prisma.project.delete({
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
