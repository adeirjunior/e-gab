import { Expenditure, Website } from "@prisma/client";
import { getSession } from "./get-session";
import prisma from "../configs/prisma";

export function withExpenditureAuth(
  action: (
    formData: FormData,
    expenditure: Expenditure & { website: Website },
    key: string,
  ) => any,
) {
  return async (formData: FormData, expenditureId: string, key: string) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Não autentificado",
      };
    }
    const expenditure = await prisma.expenditure.findUnique({
      where: {
        id: expenditureId,
      },
      include: {
        website: true,
      },
    });
    if (!expenditure) {
      return {
        error: "Gasto não encontrado",
      };
    }

    return action(formData, expenditure, key);
  };
}
