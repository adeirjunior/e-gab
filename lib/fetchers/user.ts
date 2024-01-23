import prisma from "@/lib/prisma";

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
