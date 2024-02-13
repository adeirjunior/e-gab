import { SearchResult } from "@/lib/types/types";
import AlbumGrid from "./album-grid";
import { ForceRefresh } from "@/components/force-refresh";
import cloudinary from "@/lib/configs/cloudinary";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers/site";

export default async function GalleryPage({
  params: { albumName },
}: {
  params: {
    albumName: string;
  };
}) {
  const session = await getSession()
  
  if(!session) {
    redirect("/login")
  }

  const website = await getWebsiteByUserId(session.user.id)

  const decodedAlbumName = decodeURIComponent(albumName);

  const results = (await cloudinary.v2.search
    .expression(`folder="${website.cloudinaryDir}/${decodedAlbumName}"`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };


  return (
    <section>
      <ForceRefresh />

      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Album {decodedAlbumName}</h1>
        </div>

        <AlbumGrid images={results.resources} />
      </div>
    </section>
  );
}
