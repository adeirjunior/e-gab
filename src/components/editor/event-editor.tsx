/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import { Event, EventLocation } from "@prisma/client";
import { cn, getCurrentDomain } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { CalendarIcon, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Link,
} from "@nextui-org/react";
import { useDebounce } from "usehooks-ts";
import { Editor as NovelEditor } from "novel";
import {
  updateEvent,
  updateEventMetadata,
} from "@/lib/actions/event/event.update.action";
import { TimePickerDemo } from "../time-input/time-picker-demo";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import ptBR from "date-fns/locale/pt-BR";
import AutocompleteLocationInput from "./autocomplete-location-input";

export type EventWithSite = Event & {location: EventLocation} & {
  website: { subdomain: string | null };
};

export default function EventEditor({ event }: { event: EventWithSite }) {
  const [isPendingSaving, startTransitionSaving] = useTransition();
  const [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<EventWithSite>(event);
  const [hourStart, setHourStart] = useState<Date>(event.eventStartHour!);
  const [hourEnd, setHourEnd] = useState<Date>(event.eventEndHour!);
  const debouncedData = useDebounce(data, 750);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [disableEndHour, setDisableEndHour] = useState<boolean>(true);

  const url = getCurrentDomain(
    data.website?.subdomain!,
    `/eventos/${data.slug}`,
  );

  const isSync =
    data.title === event.title &&
    data.description === event.description &&
    data.location === event.location &&
    data.eventStartHour === event.eventStartHour &&
    data.eventEndHour === event.eventEndHour && 
    data.eventStartDay === event.eventStartDay && 
    data.eventEndDay === event.eventEndDay;

  useEffect(() => {
    if (isSync) {
      return;
    }

    startTransitionSaving(async () => {
      setData((prev) => ({
        ...prev,
        eventStartHour: hourStart,
        eventEndHour: hourEnd,
      }));
      const response = await updateEvent(data);

      if ("error" in response) {
        toast.error(response.error);
      }
    });
  }, [
    debouncedData,
    startTransitionSaving,
    hourEnd,
    hourStart
  ]);

  const togglePublish = async () => {
    const formData = new FormData();
    formData.append("published", String(!data.published));
    startTransitionPublishing(async () => {
      try {
        if (!data.title || !data.description) {
          toast.error("Impossível publicar sem conteúdo.");
        } else {
          const response = await updateEventMetadata(
            formData,
            event.id,
            "published",
          );

          if (response.error) {
            toast.error(response.error);
          } else {
            setData((prev) => ({ ...prev, published: !prev.published }));
            toast.success(
              `Seu evento foi ${
                data.published ? "despublicado" : "publicado"
              } com sucesso.`,
            );
          }
        }
      } catch (error) {
        console.error("Erro ao atualizar metadata:", error);
        toast.error("Erro ao atualizar metadata do evento");
      }
    });
  };

  return (
    <>
      <Card className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 dark:border-stone-700 dark:bg-black sm:mb-[calc(20vh)] sm:rounded-lg sm:border-3 sm:px-12 sm:shadow-lg">
        <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
          {data.published && (
            <Button
              isIconOnly
              variant="bordered"
              as={Link}
              href={url}
              target="_blank"
              isExternal
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
          <div
            className={cn(
              "rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500",
              {
                "bg-stone-100": isPendingSaving,
                "bg-stone-800 text-stone-300": isPendingSaving,
              },
            )}
          >
            {isPendingSaving ? "Salvando..." : isSync ? "Salvo" : "Não salvo"}
          </div>
          <Button
            onClick={togglePublish}
            variant="bordered"
            className={cn(
              "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border-2 text-sm transition-all focus:outline-none",
              {
                "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300":
                  isPendingPublishing,
                "border-2 border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800":
                  !isPendingPublishing,
              },
            )}
            disabled={isPendingPublishing}
          >
            {isPendingPublishing ? (
              <LoadingDots />
            ) : (
              <p className="m-0">
                {data.published ? "Despublicar" : "Publicar"}
              </p>
            )}
          </Button>
        </div>
        <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
          <input
            type="text"
            placeholder="Título"
            defaultValue={event.title || ""}
            autoFocus
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="dark:placeholder-text-600 font-cal border-none px-0 text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
          />
          <Suspense fallback={<p>Carregando...</p>}>
            <NovelEditor
            className="relative block"
            disableLocalStorage
            defaultValue={event.description || ""}
            onUpdate={(editor) => {
              setData((prev) => ({
                ...prev,
                description: editor?.storage.markdown.getMarkdown(),
              }));
            }}
          />
          </Suspense>
          
        </div>
        <Card className="mb-4 border-2 dark:border-stone-700 dark:bg-black">
          <CardHeader>Localização</CardHeader>
          <CardBody>
            <AutocompleteLocationInput event={data} onChange={setData}/>
          </CardBody>
        </Card>
        <Card className="border-2 dark:border-stone-700 dark:bg-black">
          <CardHeader>Data</CardHeader>
          <CardBody>
            <div className={cn("grid gap-2")}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="bordered"
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                  className="bg-white dark:bg-black"
                    initialFocus
                    mode="range"
                    locale={ptBR}
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Checkbox isSelected={disableEndHour} onValueChange={setDisableEndHour} className="mt-4" defaultSelected>
              Sem horário para finalizar
            </Checkbox>
          </CardBody>
          <CardFooter className="gap-4">
            <Card className="border p-4 dark:border-stone-700 dark:bg-black">
              <CardHeader>
                <h3>Início</h3>
              </CardHeader>
              <TimePickerDemo date={hourStart} setDate={setHourStart} />
            </Card>
            <Card className="border p-4 dark:border-stone-700 dark:bg-black">
              <CardHeader>
                <h3>Final</h3>
              </CardHeader>
              <TimePickerDemo date={hourEnd} setDate={setHourEnd} />
            </Card>
          </CardFooter>
        </Card>
      </Card>
    </>
  );
}
