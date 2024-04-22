import { MetadataRoute } from "next";

export default function robots({
  params,
}: {
  params: { domain: string };
}): MetadataRoute.Robots {

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${params.domain}/sitemap.xml`,
  };
}
