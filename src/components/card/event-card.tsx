import { Card, Link } from "@nextui-org/react";
import { EventWithSite } from "../editor/event-editor";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface EventCardProps {
  className?: string;
  data: EventWithSite;
}

const EventCard = ({ className, data }: EventCardProps) => {
  return (
    <Card
      as={Link}
      href={`eventos/${data.slug}`}
      isPressable
      className={cn("flex w-full flex-row gap-2 shadow-2xl", className)}
    >
      <Card className="min-h-[92px] min-w-[79px] bg-gray-300"></Card>
      <div>
        <time className={cn("text-xs font-black italic text-[#5669FF]")}>
          {format(data.eventStartDay, "eee", { locale: ptBR }).toLocaleUpperCase()},{" "}
          {format(data.eventStartDay, "MMM", { locale: ptBR })}{" "}
          {format(data.eventStartDay, "d", { locale: ptBR })} •{" "}
          {format(data.eventStartHour, "p", { locale: ptBR })}
        </time>
        <h2 className={"w-fit text-sm font-medium text-[#120D26]"}>
          {data.title}
        </h2>
        <p className={`text-xs font-black italic text-[#747688]`}>
          {data.eventLocation.formatted_address}
        </p>
      </div>
    </Card>
  );
};

export default EventCard;
