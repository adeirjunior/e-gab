"use server";

import prisma from "@/lib/configs/prisma";
import { stripe } from "@/lib/configs/stripe";
import { Prisma, User } from "@prisma/client";
import { randomUUID } from "crypto";

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
        emailVerificationToken: randomUUID()
      },
    });

    const customer = await stripe.customers.create({
      email: String(user?.email),
    });

    const user2 = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeCustomerId: customer.id,
      },
    });

    return user2;
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
