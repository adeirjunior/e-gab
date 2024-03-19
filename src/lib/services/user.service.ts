import prisma from "@/lib/configs/prisma";
import { AuthenticatedUser } from "../types/types";
import { compare } from "bcrypt-ts";

export type ErrorType = {
  error: {
    message: string;
  };
};

export const userService = {
  authenticate,
};

async function authenticate(
  email: string,
  password: string,
): Promise<AuthenticatedUser | ErrorType> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
    },
  });

  if (!user) {
    return {
      error: {
        message: "Usuário não encontrado.",
      },
    };
  }

  if (!user.email) {
    return {
      error: {
        message: "Coloque um email.",
      },
    };
  }

  if (!user.password) {
    return {
      error: {
        message: "Coloque uma senha.",
      },
    };
  }

  const passIsSame = await compare(password, user.password);

  if (!passIsSame) {
    return {
      error: { message: "Senha incorreta." },
    };
  }

  return user;
}
