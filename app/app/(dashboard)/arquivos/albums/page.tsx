import cloudinary from "@/lib/configs/cloudinary";
import { AlbumCard } from "./album-card";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { getWebsiteByUserId } from "@/lib/fetchers/site";

export type Folder = { name: string; path: string };

export default async function AlbumsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const website = await getWebsiteByUserId(session.user.id);

    if (!website) {
      return null;
    }

  const { folders } = (await cloudinary.v2.api.sub_folders(
    website.cloudinaryDir,
  )) as {
    folders: Folder[];
  };

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Albums</h1>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {folders.map((folder) => (
            <AlbumCard key={folder.path} folder={folder} />
          ))}
        </div>
      </div>
    </section>
  );
}
