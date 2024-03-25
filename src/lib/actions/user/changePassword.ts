"use server";

import prisma from "@/lib/configs/prisma";
import { hashSync } from "bcrypt-ts";

export const changePassword = async (
  resetPasswordToken: string,
  password: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      resetPasswordToken,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry;
  if (!resetPasswordTokenExpiry) {
    throw new Error("Token expired");
  }

  const today = new Date();

  if (today > resetPasswordTokenExpiry) {
    throw new Error("Token expired");
  }

  const passwordHash = hashSync(password, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: passwordHash,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    },
  });

  return "Password changed successfully";
};
