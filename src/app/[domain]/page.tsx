import prisma from "@/lib/configs/prisma";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/fetchers/site";
import { getPostsForSite } from "@/lib/fetchers/post";
import Image from "next/image";
import { getProposalsForSite } from "@/lib/fetchers/proposal";
import ProposalSection from "@/components/website/proposal-section";
import SectionHeadingTitles from "@/components/website/section-heading-titles";
import StatsGrid from "@/components/website/stats-grid";
import PostCard from "@/components/website/post-card";
import { Grid, Text, Title } from "@tremor/react";
import { CalendarDemo } from "@/components/website/calendar-demo";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import MessageSvg from "@/components/demo/svg/message.svg";
import ListSvg from "@/components/demo/svg/list.svg";
import PoliticianBanner from "@/components/website/politician-banner";
import { getPoliticianDataByDomain } from "@/lib/fetchers/politician";
import { ArrowRight } from "lucide-react";

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
  const [data, posts, proposals, politician] = await Promise.all([
    getSiteData(domain),
    getPostsForSite(domain),
    getProposalsForSite(domain),
    getPoliticianDataByDomain(domain),
  ]);

  if (!data || !politician) {
    notFound();
  }

  return (
    <>
      <PoliticianBanner website={data} politician={politician} />
      <StatsGrid websiteId={data.id} />

      <section className="max-w-[1320px] w-full mx-auto space-y-6 px-6">
        <h2 className=" text-xl font-semibold text-primary-500">
          Posts recentes
        </h2>
        {posts.length > 0 ? (
          <Grid
            numItems={1}
            numItemsSm={2}
            numItemsLg={3}
            className="mx-auto gap-4 "
          >
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
        <Link className="float-right" showAnchorIcon anchorIcon={<ArrowRight />} href="/posts">
          Todos os posts
        </Link>
      </section>

      {proposals.length > 0 && (
        <section id="propostas" className="space-y-6 my-6 px-6">
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
      <Divider className="my-4" />
      <Grid numItems={2}>
        <Card>
          <CardHeader className="flex flex-col">
            <MessageSvg />
            <Title>Fale comigo</Title>
          </CardHeader>
          <CardBody>
            <Text>Envie suas reclamações e sugestões</Text>
          </CardBody>
          <CardFooter>
            <Link href="#">Saiba mais {" >"}</Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-col">
            <ListSvg />
            <Title>Meus projetos</Title>
          </CardHeader>
          <CardBody>
            <Text>Fique por dentro dos trabalhos que tenho feito</Text>
          </CardBody>
          <CardFooter>
            <Link href="#">Saiba mais {" >"}</Link>
          </CardFooter>
        </Card>
      </Grid>
      <Divider className="my-4" />
    </>
  );
}
