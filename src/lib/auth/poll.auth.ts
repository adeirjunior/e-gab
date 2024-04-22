import { Poll, Website } from "@prisma/client";
import { getSession } from "./get-session";
import prisma from "../configs/prisma";

export function withPollAuth(
  action: (
    formData: FormData,
    poll: Poll & { website: Website },
    key: string,
  ) => any,
) {
  return async (formData: FormData, pollId: string, key: string) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Não autentificado",
      };
    }
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        website: true,
      },
    });
    if (!poll) {
      return {
        error: "Enquete não encontrada",
      };
    }

    return action(formData, poll, key);
  };
}
