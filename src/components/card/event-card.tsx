import { Card, Link } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EventLocation } from "@prisma/client";

export interface EventCardProps {
  className?: string;
  data: {
    eventStartDay: Date;
    eventStartHour: Date;
    slug: string;
    title: string | null;
    eventLocation: EventLocation
  };
}

const EventCard = ({ className, data: event }: EventCardProps) => {

  const eventStartDay = event.eventStartDay;
  const eventStartHour = event.eventStartHour;

  return (
    <Card
      as={Link}
      href={`eventos/${event.slug}`}
      isPressable
      className={cn("flex w-full flex-row gap-2 shadow-2xl", className)}
    >
      <Card className="min-h-[92px] min-w-[79px] bg-gray-300"></Card>
      <div>
        <time className={cn("text-xs font-black italic text-[#5669FF]")}>
          {format(eventStartDay, "eee", { locale: ptBR }).toLocaleUpperCase()},{" "}
          {format(eventStartDay, "MMM", { locale: ptBR })}{" "}
          {format(eventStartDay, "d", { locale: ptBR })} •{" "}
          {format(eventStartHour, "p", { locale: ptBR })}
        </time>
        <h2 className={"w-fit text-sm font-medium text-[#120D26]"}>
          {event.title}
        </h2>
        <p className={`text-xs font-black italic text-[#747688]`}>
          {event.eventLocation.formatted_address}
        </p>
      </div>
    </Card>
  );
};

export default EventCard;
