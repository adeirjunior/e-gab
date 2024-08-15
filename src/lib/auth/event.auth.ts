import { Event, Website } from "@prisma/client";
import { getSession } from "./get-session";
import prisma from "../configs/prisma";
import { hasSubscription } from "../helpers/billing";

export function withEventAuth(
 action: (
    formData: FormData,
    law: Event & { website: Website },
    key: string,
  ) => Promise<Event | { error: string }>,
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

     const hasSub = await hasSubscription();

     if (session.user.role === "politician" && !hasSub) {
       return {
         error: `Você precisa assinar um plano para realizar este comando.`,
       };
     }


    return action(formData, event, key);
  };
}
