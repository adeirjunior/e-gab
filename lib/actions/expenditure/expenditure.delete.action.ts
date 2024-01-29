"use server";

import { withExpenditureAuth } from "@/lib/auth/expenditure.auth";
import prisma from "@/lib/configs/prisma";
import { Expenditure } from "@prisma/client";

export const deleteExpenditure = withExpenditureAuth(
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
