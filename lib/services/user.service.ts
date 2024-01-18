import prisma from "@/lib/prisma";
import { AuthenticatedUser } from "../types";

export const userService = {
  authenticate,
};

async function authenticate(email: string, password: string) {
  const fullUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!fullUser) {
    return {
      error: "Usuário não encontrado.",
    };
  }

  if (!fullUser.email) {
    return {
      error: "Coloque um email.",
    };
  }

  if (!fullUser.password) {
    return {
      error: "Coloque uma senha.",
    };
  }

  if (password !== fullUser.password) {
    return {
      error: "Senha incorreta.",
    };
  }

  const user: AuthenticatedUser = {
    id: String(fullUser.id),
    email: fullUser.email,
    name: fullUser.name,
  };

  return user;
}
