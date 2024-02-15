import { createCustomerIfNull } from "../helpers/billing";
import prisma from "../configs/prisma";

export const createEveryUserVariant = async (id: string) => {
  const dbUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!dbUser) {
    return false;
  }

  if (!dbUser.cloudinaryDir) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        cloudinaryDir: `E-Gab/Users/User ${id}`,
      },
    });
  }

  if (dbUser.role === "Politician") {
    const politician = await prisma.politician.findUnique({
      where: {
        userId: id,
      },
    });

    if (!politician) {
      await prisma.politician.create({
        data: {
          userId: id,
        },
      });

      await createCustomerIfNull(id);
    }
  }
};
