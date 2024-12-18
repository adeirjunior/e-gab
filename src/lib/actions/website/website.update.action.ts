"use server";

import {
  addDomainToVercel,
  removeDomainFromVercelProject,
  validDomainRegex,
} from "@/lib/domains";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { getSession } from "@/lib/auth/get-session";
import { hasSubscription } from "@/lib/helpers/billing";

export const updateSite = async (
  formData: FormData,
  _id: unknown,
  key: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  })

  const hasSub = await hasSubscription();

  if (user?.role === "politician" && !hasSub) {
    return {
      error: `Você precisa assinar um plano para realizar este comando.`,
    };
  }

  const value = formData.get(key) as string;
  const site = await getWebsiteByUserId(session.user.id);

  try {
    let response;
    if (key === "customDomain") {
      if (value.includes("vercel.pub")) {
        return {
          error: "Cannot use vercel.pub subdomain as your custom domain",
        };
      } else if (validDomainRegex.test(value)) {
        response = await prisma.website.update({
          where: {
            id: site?.id,
          },
          data: {
            customDomain: value,
          },
        });
        await Promise.all([addDomainToVercel(value)]);
      } else if (value === "") {
        response = await prisma.website.update({
          where: {
            id: site?.id,
          },
          data: {
            customDomain: null,
          },
        });
      }
      if (site?.customDomain && site?.customDomain !== value) {
        response = await removeDomainFromVercelProject(site?.customDomain);

        /* Optional: remove domain from Vercel team 

          // first, we need to check if the apex domain is being used by other sites
          const apexDomain = getApexDomain(`https://${site.customDomain}`);
          const domainCount = await prisma.site.count({
            where: {
              OR: [
                {
                  customDomain: apexDomain,
                },
                {
                  customDomain: {
                    endsWith: `.${apexDomain}`,
                  },
                },
              ],
            },
          });

          // if the apex domain is being used by other sites
          // we should only remove it from our Vercel project
          if (domainCount >= 1) {
            await removeDomainFromVercelProject(site.customDomain);
          } else {
            // this is the only site using this apex domain
            // so we can remove it entirely from our Vercel team
            await removeDomainFromVercelTeam(
              site.customDomain
            );
          }
          
          */
      }
    } else {
      response = await prisma.website.update({
        where: {
          id: site?.id,
        },
        data: {
          [key]: value,
        },
      });
    }
    console.log(
      "Updated site data! Revalidating tags: ",
      `${site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      `${site?.customDomain}-metadata`,
    );
    revalidateTag(
      `${site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    site?.customDomain && revalidateTag(`${site?.customDomain}-metadata`);

    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This ${key} is already taken`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};
