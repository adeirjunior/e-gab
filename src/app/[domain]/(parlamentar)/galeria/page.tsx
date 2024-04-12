import { ForceRefresh } from "@/components/force-refresh";
import cloudinary from "@/lib/configs/cloudinary";
import { SearchResult } from "@/lib/types/types";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteBySubdomain } from "@/lib/fetchers/site";
import { Metadata } from "next";
import GalleryList from "@/components/arquives/gallery-list";

export const metadata: Metadata = {
  title: "Bibliografia",
};

export default async function FavoritesPage({
  params,
}: {
  params: { domain: string };
}) {

  const subdomain = params.domain.endsWith(
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  )
    ? params.domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  const website = await getWebsiteBySubdomain(subdomain!);

  const results = (await cloudinary.v2.search
    .expression(`folder="${website?.cloudinaryDir}/*" AND tags=favorite`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section className="min-h-screen">
      <ForceRefresh />

      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Galeria</h1>
        </div>

        <GalleryList initialResources={results.resources} />
      </div>
    </section>
  );
}
