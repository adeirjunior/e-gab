import prisma from "@/lib/configs/prisma";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/fetchers/site";
import { getPostsForSite } from "@/lib/fetchers/post";
import Image from "next/image";
import { getProposalsForSite } from "@/lib/fetchers/proposal";
import ProposalSection from "@/components/website/proposal-section";
import SectionHeadingTitles from "@/components/website/section-heading-titles";
import StatsGrid from "@/components/website/stats-grid";
import Banner from "@/components/website/banner";
import PostCard from "@/components/website/post-card";
import { Grid } from "@tremor/react";
import CarouselWebsite from "@/components/modal/carousel";
import { CalendarDemo } from "@/components/website/calendar-demo";

export async function generateStaticParams() {
  const allSites = await prisma.website.findMany({
    select: {
      subdomain: true,
      customDomain: true,
    },
    where: {
      subdomain: "demo",
    },
  });

  const allPaths = allSites
    .flatMap(({ subdomain, customDomain }: any) => [
      subdomain && {
        domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
      customDomain && {
        domain: customDomain,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [data, posts, proposals] = await Promise.all([
    getSiteData(domain),
    getPostsForSite(domain),
    getProposalsForSite(domain),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="mb-20 w-full">
        <Banner />
        <CarouselWebsite />
        <StatsGrid websiteId={data.id} />
        {posts.length > 0 ? (
          <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2">
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
              Sem posts ainda.
            </p>
          </div>
        )}
      </div>

      {proposals.length > 0 && (
        <section>
          <SectionHeadingTitles
            id="propostas"
            subtitle="Meus objetivos"
            title="Quais são as principais areas que quero impulsionar"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. In unde expedita veniam quibusdam sed cupiditate nostrum, deleniti perspiciatis architecto fugit. Rem consequuntur error placeat dolor tenetur, incidunt nisi fugit non mollitia molestiae quisquam ad hic corporis architecto possimus quae optio cupiditate sit! Maiores dignissimos ea culpa omnis odio. Numquam, laboriosam."
          />
          {proposals.length >= 1 &&
            proposals.map((proposal, index) => (
              <ProposalSection key={index} proposal={proposal} />
            ))}
        </section>
      )}
      <section>
        <SectionHeadingTitles
          id="calendario"
          subtitle="Eventos próximos"
          title="Fique atento aos próximos eventos"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. In unde expedita veniam quibusdam sed cupiditate nostrum, deleniti perspiciatis architecto fugit. Rem consequuntur error placeat dolor tenetur, incidunt nisi fugit non mollitia molestiae quisquam ad hic corporis architecto possimus quae optio cupiditate sit! Maiores dignissimos ea culpa omnis odio. Numquam, laboriosam."
        />
        <CalendarDemo />
      </section>
    </>
  );
}
