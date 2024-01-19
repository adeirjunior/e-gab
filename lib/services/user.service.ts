import prisma from "@/lib/prisma";
import { AuthenticatedUser } from "../types";
import { compare } from "bcrypt-ts";

export const userService = {
  authenticate,
};

async function authenticate(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: true
    },
  });

  if (!user) {
    return {
      error: "Usuário não encontrado.",
    };
  }

  if (!user.email) {
    return {
      error: "Coloque um email.",
    };
  }

  if (!user.password) {
    return {
      error: "Coloque uma senha.",
    };
  }

  const passIsSame = await compare(password, user.password)

  if (!passIsSame) {
    return {
      error: "Senha incorreta.",
    };
  }

  return user;
}
