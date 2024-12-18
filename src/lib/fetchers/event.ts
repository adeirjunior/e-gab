import { unstable_cache } from "next/cache";
import prisma from "@/lib/configs/prisma";
import { replaceTweets } from "@/lib/remark-plugins";
import { serialize } from "next-mdx-remote/serialize";
import { EventWithSite } from "@/components/editor/event-editor";

export async function getMdxSource(postContents: string) {
  const content =
    postContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [replaceTweets],
    },
  });

  return mdxSource;
}

export async function getEventData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      const data = await prisma.event.findFirst({
        where: {
          website: subdomain ? { subdomain } : { customDomain: domain },
          slug,
          published: true,
        },
        include: {
          location: true,
          usersWhoSubscripted: true
        },
      });

      // Handle case where location is null
      if (!data || !data.description || !data.location) {
        return {
          error: "Post está indefinido ou localização não encontrada",
        };
      }

      const [mdxSource, adjacentEvents] = await Promise.all([
        getMdxSource(data.description),
        prisma.event.findMany({
          where: {
            website: subdomain ? { subdomain } : { customDomain: domain },
            published: true,
            NOT: {
              id: data.id,
            },
          },
          select: {
            slug: true,
            title: true,
            location: true,
            eventStartDay: true,
            eventStartHour: true
          },
        }),
      ]);

      // Ensure location is not null
      const location = data.location;
    
      return {
        ...data,
        location,
        mdxSource,
        adjacentEvents,
      };
    },
    [`${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`${domain}-${slug}`],
    },
  )();
}

export async function getEventsForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  const events = await unstable_cache(
    async () => {
      return prisma.event.findMany({
        where: {
          website: subdomain ? { subdomain } : { customDomain: domain },
          published: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        include: {
          location: true,
        },
      });
    },
    [`${domain}-events`],
    {
      revalidate: 900,
      tags: [`${domain}-events`],
    },
  )();

   const validEvents: EventWithSite[] = events.filter(
     (event): event is EventWithSite => event.location !== null,
   );


  return validEvents;
}

export async function getFirstEventsForSite(domain: string, take: number) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return prisma.event.findMany({
        where: {
          website: subdomain ? { subdomain } : { customDomain: domain },
          published: true,
        },
        select: {
          id: true,
          title: true,
          description: true,
          slug: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        take
      });
    },
    [`${domain}-posts`],
    {
      revalidate: 900,
      tags: [`${domain}-posts`],
    },
  )();
}
