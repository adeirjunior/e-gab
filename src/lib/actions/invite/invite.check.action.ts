"use server";

import prisma from "@/lib/configs/prisma";

export const checkInvite = async (formData: FormData) => {
  const invitedEmail = formData.get("email") as string;

  const invite = await prisma.userInvite.findFirst({
    where: {
      invitedEmail,
    },
    orderBy: {
      inviteTokenExpiry: "asc",
    },
    take: -1,
  });

  return Boolean(invite) && invite?.inviteTokenExpiry! > new Date();
};
