"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import va from "@vercel/analytics";
import { Suspense, useState } from "react";
import { useSession } from "next-auth/react";
import { FormButton } from "../button/form-button";
import AutocompleteLocationGabinete from "../editor/autocomplete-location-gabinete";
import { toast } from "sonner";
import { Location } from "@prisma/client";
import { updateLocation } from "@/lib/actions/location/location.update.action";

export default function AutocompleteForm({
  title,
  helpText,
  inputAttrs,
  location,
}: {
  title: string;
  description: string;
  helpText: string;
  location: Location;
  inputAttrs: {
    name: string;
    type: string;
    defaultValue: string;
    placeholder?: string;
    maxLength?: number;
    pattern?: string;
  };
}) {
  const router = useRouter();
  const { update } = useSession();

  const [data, setData] = useState<Location>(location);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateLocation(data).then(async (res: any) => {
      if (res.error) {
        toast.error(res.error);
        console.error(res.error);
      } else {
        va.track(`Updated ${inputAttrs.name}`);
        await update();
        router.refresh();
        toast.success(`Atualizado ${inputAttrs.name} com sucesso!`);
      }
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Card className="rounded-lg border-3 border-stone-200 bg-white dark:border-stone-700 dark:bg-black">
        <CardHeader>
          <h2 className="font-cal m-3 p-0 text-xl dark:text-white">{title}</h2>
        </CardHeader>
        <CardBody className="relative flex flex-col space-y-4 p-5 sm:p-10 sm:pt-0">
          <AutocompleteLocationGabinete location={data} onChange={setData as any} />
        </CardBody>
        <CardFooter className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {helpText}
          </p>
          <Suspense
            fallback={
              <Skeleton>
                <FormButton isEmpty />
              </Skeleton>
            }
          >
            <FormButton />
          </Suspense>
        </CardFooter>
      </Card>
    </form>
  );
}
