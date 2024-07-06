import { notFound } from "next/navigation";
import prisma from "@/lib/configs/prisma";
import { getSiteData } from "@/lib/fetchers/site";
import BlogCard from "@/components/card/blog-card";
import MDX from "@/components/mdx";
import "./style.css";
import { getEventData } from "@/lib/fetchers/event";
import ShareButtons from "@/components/button/share-buttons";
import { format } from "date-fns";
import LocationIcon from "@/components/icons/location";
import CalendarIcon from "@/components/icons/calendar";
import { ptBR } from "date-fns/locale";
import SubscribeButton from "./subscribe-button";
import StandardGoogleMap from "@/components/maps/standard-google-map";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const [data, siteData] = await Promise.all([
    getEventData(domain, slug),
    getSiteData(domain),
  ]);
  if (!data || !siteData) {
    return null;
  }
  if ("error" in data) {
    return null;
  }
  const { title, description } = data;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vercel",
    },
  };
}

export async function generateStaticParams() {
  const allPosts = await prisma.event.findMany({
    select: {
      slug: true,
      website: {
        select: {
          subdomain: true,
          customDomain: true,
        },
      },
    },
    // feel free to remove this filter if you want to generate paths for all posts
    where: {
      website: {
        subdomain: "demo",
      },
    },
  });

  const allPaths = allPosts
    .flatMap(({ website, slug }) => [
      website?.subdomain && {
        domain: `${website.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        slug,
      },
      website?.customDomain && {
        domain: website.customDomain,
        slug,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SitePostPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const data = await getEventData(domain, slug);

  if ("error" in data) {
    console.log(data);
    notFound();
  }

  return (
    <>
      <article>
        <meta itemProp="wordCount" content="481" />
        <header
          itemScope
          itemType="https://schema.org/BlogPosting"
          itemID={`${domain}/agenda/${slug}`}
          className="flex flex-col items-center justify-center px-6"
        >
          <div className="m-auto w-full space-y-6 text-start md:w-7/12">
            <h1
              itemProp="name"
              className="font-title text-3xl font-bold italic text-stone-800 md:text-6xl"
            >
              {data.title}
            </h1>
            <div className="space-y-4 md:flex md:items-center md:justify-center md:gap-4 md:space-y-0">
              <div className="flex gap-2">
                <div className="w-fit rounded-xl bg-[#566aff2a] p-2">
                  <CalendarIcon />
                </div>
                <div>
                  <h2 className="text-base font-medium">{format(data.eventStartDay, "d LLLL, yyyy", { locale: ptBR })}</h2>
                  <p className="text-[12px] font-black">
                    {format(data.eventStartDay, "eeee", { locale: ptBR })},{" "}
                    {`${format(data.eventStartHour, "k:m", { locale: ptBR })} ${
                      data.eventEndHour &&
                      `- ${format(data.eventEndHour, "k:m", { locale: ptBR })}`
                    }`}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-fit rounded-xl bg-[#566aff2a] p-2">
                  <LocationIcon />
                </div>
                <div>
                  <h2 className="text-base font-medium">{data.location}</h2>
                  <p className="text-[12px] font-black">
                    36 Guild Street London, UK
                  </p>
                </div>
              </div>
            </div>

        <StandardGoogleMap event={data} />

          </div>
        </header>
        <section className="my-8 px-6">
          <h2 className="mx-auto text-lg font-semibold md:w-7/12 md:text-2xl">
            Sobre o Evento
          </h2>
          <main>
            <MDX source={data.mdxSource} />
          </main>
              <div className="sticky bottom-0 w-full">
            <div className="sticky bottom-0 flex w-full items-center justify-center bg-gradient-to-t from-white to-transparent pt-4">
              <SubscribeButton>Inscrever-se</SubscribeButton>
            </div>
            <div className="h-4 bg-white"></div>
          </div>
          
        </section>
      </article>

      

      <ShareButtons url={`${domain}/agenda/${slug}`} />

      {data.adjacentEvents.length > 0 && (
        <div className="relative mb-20 mt-10 sm:mt-20">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-stone-300 dark:border-stone-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-sm text-stone-500 dark:bg-black dark:text-stone-400">
              Continue lendo
            </span>
          </div>
        </div>
      )}
      {data.adjacentEvents && (
        <div className="mx-5 mb-20 grid max-w-screen-xl grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3">
          {data.adjacentEvents.map((data: any, index: number) => (
            <BlogCard key={index} data={data} />
          ))}
        </div>
      )}
    </>
  );
}