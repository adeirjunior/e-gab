import { ForceRefresh } from "@/components/force-refresh";

import { Metadata } from "next";
import GalleryList from "@/components/arquives/gallery-list";
import { getGalleryImagesWithTags } from "@/lib/fetchers/image";

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



  const results = await getGalleryImagesWithTags(subdomain!, ["favorite"]);

  return (
    <section>
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
