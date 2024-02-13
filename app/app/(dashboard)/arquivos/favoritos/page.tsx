import { ForceRefresh } from "@/components/force-refresh";
import FavoritesList from "./favorites-list";
import cloudinary from "@/lib/configs/cloudinary";
import { SearchResult } from "@/lib/types/types";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers/site";

export default async function FavoritesPage() {
const session = await getSession();

if (!session) {
  redirect("/login");
}

const website = await getWebsiteByUserId(session.user.id);

  const results = (await cloudinary.v2.search
    .expression(`folder="${website.cloudinaryDir}/*" AND tags=favorite`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <ForceRefresh />

      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Imagens Favoritas</h1>
        </div>

        <FavoritesList initialResources={results.resources} />
      </div>
    </section>
  );
}
