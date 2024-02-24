import { PoliticalProject, Post, Website } from "@prisma/client";
import prisma from "../configs/prisma";
import { getSession } from "./get-session";

export function withSiteAuth(action: any) {
  return async (formData: FormData | null, key: string | null) => {
    const session = await getSession();
    if (!session) {
      return {
        error: "Não autentificado",
      };
    }
    console.log(key);
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

export function withPostAuth(
  action: (
    formData: FormData,
    post: Post & { website: Website },
    key: string ,
  ) => Promise<Post | {error: string}>,
) {
  return async (formData: FormData, postId: string, key: string) => {
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

    if (!post) {
      return {
        error: "post não encontrado",
      };
    }

    return action(formData, post, key);
  };
}

export function withLawAuth(action: any) {
  return async (
    formData: FormData | null,
    lawId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Não autentificado",
      };
    }
    const law = await prisma.law.findUnique({
      where: {
        id: lawId,
      },
      include: {
        website: true,
      },
    });
    if (!law) {
      return {
        error: "Lei não encontrada",
      };
    }

    return action(formData, law, key);
  };
}

export function withProjectAuth(
  action: (
    formData: FormData,
    project: PoliticalProject & { website: Website },
    key: string,
  ) => any,
) {
  return async (formData: FormData, projectId: string, key: string) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Não autentificado",
      };
    }
    const project = await prisma.politicalProject.findUnique({
      where: {
        id: projectId,
      },
      include: {
        website: true,
      },
    });

    if(!project) {
      return {
        error: "Projeto não encontrado"
      }
    }

    return action(formData, project, key);
  };
}
