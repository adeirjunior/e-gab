import LawCard from "@/components/card/law-card";
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

  const [laws] = await Promise.all([getLawsForSite(domain)]);

  return (
    <section>
      {laws.length > 0 ? (
        <Grid
          numItems={1}
          numItemsSm={2}
          numItemsMd={3}
          numItemsLg={4}
          className="gap-2"
        >
          {" "}
          {laws.map((law, index) => (
            <LawCard key={index} data={law} />
          ))}
        </Grid>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <Image
            alt="missing law"
            src="https://illustrations.popsy.co/gray/success.svg"
            width={400}
            height={400}
            className="dark:hidden"
          />
          <Image
            alt="missing law"
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
    </section>
  );
}
