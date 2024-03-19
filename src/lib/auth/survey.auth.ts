import { Survey, Website } from "@prisma/client";
import { getSession } from "./get-session";
import prisma from "../configs/prisma";

export function withSurveyAuth(
  action: (
    formData: FormData,
    survey: Survey & { website: Website },
    key: string,
  ) => any,
) {
  return async (formData: FormData, surveyId: string, key: string) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Não autentificado",
      };
    }
    const survey = await prisma.survey.findUnique({
      where: {
        id: surveyId,
      },
      include: {
        website: true,
      },
    });
    if (!survey) {
      return {
        error: "Pesquisa não encontrado",
      };
    }

    return action(formData, survey, key);
  };
}
