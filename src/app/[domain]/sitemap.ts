import { getLawsForSite } from "@/lib/fetchers/law";
import { getPostsForSite } from "@/lib/fetchers/post";

export default async function sitemap({
  params,
}: {
  params: { domain: string };
}) {
     const subdomain = params.domain.endsWith(
       `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
     )
       ? params.domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
       : null;

    const posts = await getPostsForSite(subdomain!);
    const laws = await getLawsForSite(subdomain!);
    const routes = ["", "/contato", "/posts", "/ouvidoria", "/galeria", "/bibliografia", "/agenda", "/mocoes", "/indicacoes-legislativas", "/emendas", "/projetos", "/enquetes", "/pesquisas"].map((route) => ({
      url: `${params.domain}${route}`,
      lastModified: new Date().toISOString(),
    }));

  return [
    ...posts.map((post) => ({
      url: `${params.domain}/posts/${post.slug}`,
      lastModified: post.updatedAt,
    })),
    ...laws.map((law) => ({
      url: `${params.domain}/leis/${law.slug}`,
      lastModified: law.updatedAt,
    })),
    ...routes
  ];
}
