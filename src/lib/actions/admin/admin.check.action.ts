"use server";

import prisma from "@/lib/configs/prisma";

export const checkAdmin = async (formData: FormData) => {
  const email = formData.get("email") as string;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user?.role === "admin"
};
