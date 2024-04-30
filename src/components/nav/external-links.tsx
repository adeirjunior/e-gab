"use server"

import { fetcher, getCurrentDomain } from "@/lib/utils";
import { getSession } from "@/lib/auth/get-session";
import { getWebsiteByUserId } from "@/lib/fetchers/site";


export const getExternalLinks = async (subdomain: string) => {
  const session = await getSession();

  const website = await getWebsiteByUserId(session?.user.id!);
  const res = await fetcher(getCurrentDomain("", `/api/domain/${website?.customDomain}/verify`))

  const externalLinks = [
    {
      name: "Atualizações",
      href: "https://vercel.com/blog/platforms-starter-kit",
      icon: "Megaphone",
    },
    {
      name: "Documentação",
      href: getCurrentDomain("docs"),
      icon: "FileCode",
    },
    {
      name: "Veja o site",
      href:
        res.domainJson.verified === true ? `https://${website?.customDomain}` : 
        getCurrentDomain(subdomain!),
      icon: "Layout",
    },
  ];

  return externalLinks;
};
