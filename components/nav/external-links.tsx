import { getCurrentDomain } from "@/lib/utils";

export const getExternalLinks = async (subdomain: string) => {

  const externalLinks = [
    {
      name: "Atualizações",
      href: "https://vercel.com/blog/platforms-starter-kit",
      icon: "Megaphone",
    },
    {
      name: "Documentação",
      href: getCurrentDomain("doc"),
      icon: "FileCode",
    },
    {
      name: "Veja o site",
      href: getCurrentDomain(subdomain!),
      icon: "Layout",
    },
  ];

  return externalLinks;
};
