import PostCard from "@/components/website/post-card";
import { getLawsForSite } from "@/lib/fetchers/law";
import { Image } from "@nextui-org/react";
import { Grid } from "@tremor/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leis",
};

export default async function Page({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);

  const [posts] = await Promise.all([getLawsForSite(domain)]);

  return (
    <div>
      {posts.length > 0 ? (
        <Grid numItems={1} numItemsSm={2} numItemsMd={3} numItemsLg={4} className="gap-2">
          {" "}
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </Grid>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <Image
            alt="missing post"
            src="https://illustrations.popsy.co/gray/success.svg"
            width={400}
            height={400}
            className="dark:hidden"
          />
          <Image
            alt="missing post"
            src="https://illustrations.popsy.co/white/success.svg"
            width={400}
            height={400}
            className="hidden dark:block"
          />
          <p className="font-title text-2xl text-stone-600 dark:text-stone-400">
            Sem leis ainda.
          </p>
        </div>
      )}
    </div>
  );
}
