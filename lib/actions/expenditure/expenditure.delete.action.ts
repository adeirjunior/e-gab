"use server"

import { withPostAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Expenditure } from "@prisma/client";

export const deleteExpenditure = withPostAuth(
  async (_: FormData, expenditure: Expenditure) => {
    try {
      const response = await prisma.expenditure.delete({
        where: {
          id: expenditure.id,
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
