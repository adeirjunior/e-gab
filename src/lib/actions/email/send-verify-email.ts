"use server";

import resend from "@/lib/configs/resend";
import prisma from "@/lib/configs/prisma";
import { randomUUID } from "crypto";
import VerifyEmail from "@/components/emails/verify-email";

export const sendVerifyEmail = async (id: string) => {
  const emailVerificationToken = randomUUID()

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        emailVerificationToken,
      },
    });

    return await resend.emails.send({
      from: "E-Gab <no-reply@simplesgov.com.br>",
      to: user.email!,
      subject: `Verifique seu email ${user.name}.`,
      react: VerifyEmail({
        name: user.name,
        token: emailVerificationToken,
      }),
    });
  } catch (error) {}
};
