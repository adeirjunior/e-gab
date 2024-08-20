"use server";

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { hasSubscription } from "@/lib/helpers/billing";
import { Location } from "@prisma/client";

export const updateLocation = async (
  location: Location
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
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

  try {
    const site = await getWebsiteByUserId(session.user.id);

     const response = await prisma.location.update({
       data: {
         adr_address: location.adr_address,
         formatted_address: location.formatted_address,
         lat: location.lat,
         lng: location.lng,
         name: location.name,
         url: location.url,
       },
       where: {
         id: location.id,
       },
     });

    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};
