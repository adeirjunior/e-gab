"use server";
import prisma from "@/lib/configs/prisma";
import resend from "@/lib/configs/resend";
import WelcomeEmail from "@/components/emails/welcome-politician";
import { getSession } from "@/lib/auth/get-session";

export const sendWelcomeEmail = async () => {
const session = await getSession();
if (!session?.user.id) {
  return {
    error: "Not authenticated",
  };
}

  try {

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    return await resend.emails.send({
      from: "E-Gab <no-reply@egab.online",
      to: user?.email!,
      subject: `Seja bem vindo a E-Gab ${user?.name}!`,
      react: WelcomeEmail(),
    });
  } catch (error) {}
};
