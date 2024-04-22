"use server"

import prisma from "@/lib/configs/prisma";

export async function getAdminByUserId(id: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { 
        userId: id
       },
      include: {
        user: true
      }
    });

    if (!admin) {
      throw new Error("Não foi possível encontrar o usuário");
    }

    return admin;
  } catch (error: any) {
    throw new Error(`Erro ao obter usuário: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAdminById(id: string) {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!admin) {
      throw new Error("Não foi possível encontrar o usuário");
    }

    return admin;
  } catch (error: any) {
    throw new Error(`Erro ao obter usuário: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}
