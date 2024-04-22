import { Event, Website } from "@prisma/client";
import { getSession } from "./get-session";
import prisma from "../configs/prisma";

export function withEventAuth(
  action: (
    formData: FormData,
    event: Event & { website: Website },
    key: string,
  ) => any,
) {
  return async (formData: FormData, eventId: string, key: string) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Não autentificado",
      };
    }
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        website: true,
      },
    });
    if (!event) {
      return {
        error: "Evento não encontrado",
      };
    }

    return action(formData, event, key);
  };
}
