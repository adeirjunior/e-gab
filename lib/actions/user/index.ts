"use server";

import prisma from "@/lib/configs/prisma";

export const createUser = async (name: string, email: string, password: string) => {
    await prisma.user
          .create({
            data: {
              name,
              email,
              password,
            },
          })
    }