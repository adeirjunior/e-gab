import { LegislativeIndication, PoliticalProject, PoliticianMotion, Post, Website } from "@prisma/client";
import prisma from "../configs/prisma";
import { getSession } from "./get-session";
import { hasSubscription } from "../helpers/billing";

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
      include: {
        politician: { 
          include: {
            website: true
          }
        }, 
        admin: true
      }
    });

    const hasSub = await hasSubscription();

    if (checkUser?.role === "politician" && !hasSub) {
      return {
        error: `Você precisa assinar um plano para realizar este comando.`,
      };
    }


    if (!checkUser) {
      return {
        error: "Não autorizado",
      };
    }

    if (
      checkUser.admin?.websiteId === null &&
      checkUser.politician?.website?.id === null
    ) {
      return {
        error: "Não há website",
      };
    }

    const site = await prisma.website.findUnique({
      where: {
        id: checkUser.admin?.websiteId || checkUser.politician?.website?.id,
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
    key: string,
  ) => Promise<Post | { error: string }>,
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
    if (!post || post.userId !== session.user.id) {
      return {
        error: "Post não encontrado",
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

    if (!project) {
      return {
        error: "Falhou em coletar projeto",
      };
    }

    return action(formData, project, key);
  };
}

export function withLegislativeIndicationAuth(action: any) {
  return async (
    formData: FormData | null,
    legislativeIndicationId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Não autentificado",
      };
    }
    const legislativeIndication =
      await prisma.legislativeIndication.findUnique({
        where: {
          id: legislativeIndicationId,
        },
        include: {
          website: true,
        },
      });
    if (!legislativeIndication) {
      return {
        error: "Indicação legislativa não encontrada",
      };
    }

    return action(formData, legislativeIndication, key);
  };
}

export function withMotionAuth(
  action: (
    formData: FormData,
    motion: PoliticianMotion & { website: Website },
    key: string,
  ) => any,
) {
  return async (formData: FormData, motionId: string, key: string) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Não autentificado",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

     const hasSub = await hasSubscription();

     if (user?.role === "politician" && !hasSub) {
       return {
         error: `Você precisa assinar um plano para realizar este comando.`,
       };
     }

    const motion = await prisma.politicianMotion.findUnique({
      where: {
        id: motionId,
      },
      include: {
        website: true,
      },
    });

    if (!motion) {
      return {
        error: "Falhou em coletar moção",
      };
    }

    return action(formData, motion, key);
  };
}
