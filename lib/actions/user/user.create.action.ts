"use server";

import prisma from "@/lib/configs/prisma";
import { Prisma, User } from "@prisma/client";

export const createUser: (
  name: string,
  email: string,
  password: string,
) => User | any = async (name, email, password) => {
  try {
    const user: User = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email",
        );
        return null;
      }
    }
    throw e;
  }
};