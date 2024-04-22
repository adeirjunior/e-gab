"use server";

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";

export const checkPolitician = async (formData: FormData) => {
    const email = formData.get("email") as string;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      admin: {
        include: {
          website: {
            include: {
                politician: {
                    include: {
                        user: true
                    }
                }
            },
          },
        },
      },

    },
  });

  return user?.role === "politician" || user?.admin?.website.politician.user.email === email;
};
