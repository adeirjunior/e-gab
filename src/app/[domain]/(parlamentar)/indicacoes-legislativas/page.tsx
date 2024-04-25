import IndicativeLegislationCard from "@/components/card/legislative-indication-card";
import { Image } from "@nextui-org/react";
import { Grid } from "@tremor/react";
import { Metadata } from "next";
import { getLegislativeIndicationForSite } from "../../../../lib/fetchers/legislative-indication";
import { LegislativeIndication } from "@prisma/client";

export const metadata: Metadata = {
  title: "Indicações Legislativas",
};

export default async function Page({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);

  const [posts] = await Promise.all([getLegislativeIndicationForSite(domain)]);

  return (
    <section>
      {posts.length > 0 ? (
        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2">
          {" "}
          {posts.map((post, index) => (
            <IndicativeLegislationCard key={index} data={post as LegislativeIndication} />
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
            Sem indicações legislativas ainda.
          </p>
        </div>
      )}
    </section>
  );
}
