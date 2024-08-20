"use server";

import { withSiteAuth } from "@/lib/auth";
import { Website } from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";

export const createEvent = withSiteAuth(async (_: FormData, site: Website) => {
  const location = await prisma.location.create({
    data: {
      name: "",
      adr_address: "",
      formatted_address: "",
      url: "",
      lat: 0,
      lng: 0,
    },
  });

  const response = await prisma.event.create({
    data: {
      websiteId: site.id,
      eventStartDay: new Date(),
      eventEndDay: new Date(new Date().setDate(new Date().getDate() + 1)),
      eventStartHour: new Date(new Date().setHours(18, 0)),
      eventEndHour: new Date(new Date().setHours(20, 0)),
      locationId: location.id,
    },
  });

  revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
  );
  site.customDomain && revalidateTag(`${site.customDomain}-posts`);

  return response;
});
