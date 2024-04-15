import { getAllWebsites } from "@/lib/fetchers/site";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const websites = (await getAllWebsites()) || [];

   const landindPaths = [
     "",
     "/contato",
     "/precos",
     "/sobre",
   ].map((route) => ({
     url: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}${route}`,
     lastModified: new Date().toISOString(),
   }));

   const docPaths = [""].map((route) => ({
     url: `docs.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}${route}`,
     lastModified: new Date().toISOString(),
   }));

  return [
    ...websites.map((site) => ({
      url: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      lastModified: site.updatedAt,
      priority: 1
    })),
    ...websites.map((site) => ({
      url: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/contato`,
    })),
    ...websites.map((site) => ({
      url: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/posts`,
    })),
    ...websites.map((site) => ({
      url: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/leis`,
    })),
    ...websites.map((site) => ({
      url: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/ouvidoria`,
    })),
    ...websites.map((site) => ({
      url: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/agenda`,
    })),
    ...websites.map((site) => ({
      url: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/galeria`,
    })),
    ...websites.map((site) => ({
      url: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/mocoes`,
    })),
    ...websites.map((site) => ({
      url: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/bibliografia`,
    })),
    ...websites.map((site) => ({
      url: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/projetos`,
    })),
    ...websites.map((site) => ({
      url: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/enquetes`,
    })),
    ...websites.map((site) => ({
      url: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/pesquisas`,
    })),
    ...landindPaths,
    ...docPaths,
  ];
}
