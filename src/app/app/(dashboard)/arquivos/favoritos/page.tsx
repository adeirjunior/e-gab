import { ForceRefresh } from "@/components/force-refresh";
import FavoritesList from "../../../../../components/arquives/favorites-list";
import cloudinary from "@/lib/configs/cloudinary";
import { SearchResult } from "@/lib/types/types";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FullHeart } from "@/components/icons/full-heart";
import { getGalleryImagesWithTags } from "@/lib/fetchers/image";

export default async function FavoritesPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const website = await getWebsiteByUserId(session.user.id);

  
  if (!website) {
    return null;
  }

  const results = await getGalleryImagesWithTags(website.subdomain, ["favorite"])

  return (
    <section>
      <ForceRefresh />

      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Imagens Favoritas</h1>
        </div>
        <Alert>
          <AlertTitle>Atenção!</AlertTitle>
          <AlertDescription>
            Todos os arquivos que forem colocados nos favoritos irão aparecer na
            galeria do site do político.
          </AlertDescription>
        </Alert>

        <FavoritesList initialResources={results.resources} />
      </div>
    </section>
  );
}
