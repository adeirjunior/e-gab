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
    })),
    ...landindPaths,
    ...docPaths,
  ];
}
