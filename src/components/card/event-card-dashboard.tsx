import BlurImage from "../arquives/blur-image";
import type { Event } from "@prisma/client";
import { toDateString } from "@/lib/utils";
import { Card, Link } from "@nextui-org/react";

interface LawCardProps {
  data: Event,
}

export default function EventCardDashboard({ data }: LawCardProps) {
  return (
    <Card className="ease overflow-hidden rounded-2xl border-2 border-stone-100 bg-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-stone-800 xl:flex" as={Link} isPressable href={`eventos/${data.id}`}>
        <div className="h-full border-t w-full border-stone-200 px-5 py-8 dark:border-stone-700 dark:bg-black">
          <h3 className="font-title text-xl tracking-wide dark:text-white">
            {data.title}
          </h3>
          <p className="text-md my-2 w-fit truncate italic text-stone-600 dark:text-stone-400">
            {data.description}
          </p>
          <p className="my-2 w-fit text-sm text-stone-600 dark:text-stone-400">
            Publicado {toDateString(data.createdAt)}
          </p>
        </div>
    </Card>
  );
}
