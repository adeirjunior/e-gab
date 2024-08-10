"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Card, Link } from "@nextui-org/react";
import { format, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { EventWithSite } from "../editor/event-editor";

export function EventsCalendar({ events }: { events: EventWithSite[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const filteredEvents = events.filter((event) =>
    isSameDay(new Date(event.eventStartDay), date!),
  );

  return (
    <div>
      <Calendar
        mode="single"
        locale={ptBR}
        selected={date}
        onSelect={setDate}
        events={events}
        className="w-fit rounded-md border shadow"
      />
      <div>
        <h3 className={cn("text-lg font-bold")}>
          {date
            ? `Eventos em ${format(date, "PPP", { locale: ptBR })}`
            : "Selecione uma data"}
        </h3>
        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map((event, index) => (
              <li key={index}>
                <Card
                  as={Link}
                  href={`/eventos/${event.slug}`}
                  className={cn("flex flex-row")}
                >
                  <div
                    className={cn("h-10 w-10 rounded-full bg-gray-500")}
                  ></div>
                  <div>
                    <h4 className={cn("text-base font-bold")}>{event.title}</h4>
                    <time dateTime={format(event.eventStartHour, "P")}>
                      {format(event.eventStartHour, "p", { locale: ptBR })}
                    </time>
                    <time dateTime={format(event.eventEndHour!, "P")}>
                      {format(event.eventEndHour!, " - p", { locale: ptBR })}
                    </time>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum evento encontrado</p>
        )}
      </div>
    </div>
  );
}
