import { ImageProps } from "@/lib/types/types";
import getResults from "@/lib/utils/cachedImages";
import getBase64ImageUrl from "@/lib/utils/generateBlurPlaceholder";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth/get-session";
import CarouselWrapper from "./carousel-wrapper";

const Home = async ({ params }: { params: { photoId: string } }) => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const website = await getWebsiteByUserId(session.user.id);
  const results = await getResults(website.cloudinaryDir);

  const reducedResults: ImageProps[] = results.resources.map((result, i) => ({
    id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
  }))

  const photo = reducedResults.find((img) => img.id === Number(params.photoId));

  if (!photo) {
    notFound();
  }

  const blurDataUrl = await getBase64ImageUrl(photo);

  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <CarouselWrapper blurDataUrl={blurDataUrl} photo={photo} photoId={params.photoId} />
      </main>
    </>
  );
};

export default Home;
