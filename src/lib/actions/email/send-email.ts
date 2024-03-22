"use server";

import InviteUserTemplate from "@/components/emails/invite-user-template";
import { getSession } from "@/lib/auth/get-session";
import resend from "@/lib/configs/resend";

export const sendInviteEmail = async (formData: FormData) => {
  const session = await getSession();

  if (!session) {
    throw new Error("Você não esta logado (sessão vazia).");
  }

  const email = formData.get("email") as string;

  try {
    return await resend.emails.send({
      from: "E-Gab <onboarding@resend.dev>",
      to: email,
      subject: `Você foi convidado por ${session.user.name} para administrar o site do político ${session.user.name}`,
      react: InviteUserTemplate({ firstName: session.user.name }),
    });
  } catch (error) {}
};
