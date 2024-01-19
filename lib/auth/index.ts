import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { authOptions } from "./config";

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
    };
  } | null>;
}

export function withSiteAuth(action: any) {
  return async (formData: FormData | null, key: string | null) => {
    const session = await getSession();
    if (!session) {
      return {
        error: "Não autentificado",
      };
    }
    const checkUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!checkUser) {
      return {
        error: "Não autorizado",
      };
    }

    if (checkUser.websiteId === null) {
      return {
        error: "Não há website",
      };
    }

    const site = await prisma.website.findUnique({
      where: {
        id: checkUser.websiteId,
      },
    });

    if (!site || !checkUser) {
      return {
        error: "Não autorizado",
      };
    }

    return action(formData, site, key);
  };
}

export function withPostAuth(action: any) {
  return async (
    formData: FormData | null,
    postId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Não autentificado",
      };
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        website: true,
      },
    });
    if (!post || post.userId !== session.user.id) {
      return {
        error: "Post não encontrado",
      };
    }

    return action(formData, post, key);
  };
}
