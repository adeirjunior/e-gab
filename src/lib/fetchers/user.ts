"use server";

import prisma from "@/lib/configs/prisma";

export async function getUserRole(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { role: true },
    });

    if (!user) {
      throw new Error("Não foi possível encontrar o usuário");
    }

    return user.role;
  } catch (error: any) {
    throw new Error(`Erro ao obter papel do usuário: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getClientByUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        client: true,
      },
    });

    if (!user || !user.client) {
      throw new Error("Não foi possível encontrar o usuário");
    }

    return user.client;
  } catch (error: any) {
    throw new Error(`Erro ao obter papel do usuário: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("Não foi possível encontrar o usuário");
    }

    return user;
  } catch (error: any) {
    throw new Error(`Erro ao obter usuário: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}
