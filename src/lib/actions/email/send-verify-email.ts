"use server";

import resend from "@/lib/configs/resend";
import prisma from "@/lib/configs/prisma";
import { randomUUID } from "crypto";
import VerifyEmail from "@/components/emails/verify-email";
import { getSession } from "@/lib/auth/get-session";

export const sendVerifyEmail = async () => {
  const emailVerificationToken = randomUUID()
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        emailVerificationToken,
      },
    });

    return await resend.emails.send({
      from: "E-Gab <no-reply@egab.online>",
      to: user.email!,
      subject: `Verifique seu email ${user.name}.`,
      react: VerifyEmail({
        name: user.name,
        token: emailVerificationToken,
      }),
    });
  } catch (error) {}
};
