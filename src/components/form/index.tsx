"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import DomainStatus from "./domain-status";
import DomainConfiguration from "./domain-configuration";
import va from "@vercel/analytics";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Textarea,
} from "@nextui-org/react";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import Uploader from "./uploader";

export default function Form({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
}: {
  title: string;
  description: string;
  helpText: string;
  inputAttrs: {
    name: string;
    type: string;
    defaultValue: string;
    placeholder?: string;
    maxLength?: number;
    pattern?: string;
  };
  handleSubmit: any;
}) {
  const { id } = useParams() as { id?: string };
  const router = useRouter();
  const { update } = useSession();

  return (
    <form
      action={async (data: FormData) => {
        if (
          inputAttrs.name === "customDomain" &&
          inputAttrs.defaultValue &&
          data.get("customDomain") !== inputAttrs.defaultValue &&
          !confirm("Tem certeza que quer mudar seu domínio customizado?")
        ) {
          return;
        }
        handleSubmit(data, id, inputAttrs.name).then(async (res: any) => {
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
      }}
    >
      <Card className="rounded-lg border-3 border-stone-200 bg-white dark:border-stone-700 dark:bg-black">
        <CardHeader>
          <h2 className="font-cal m-3 p-0 text-xl dark:text-white">{title}</h2>
        </CardHeader>
        <CardBody className="relative flex flex-col space-y-4 p-5 sm:p-10 sm:pt-0">
          <Suspense
            fallback={
              <Skeleton>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {description}
                </p>
              </Skeleton>
            }
          >
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {description}
            </p>
          </Suspense>

          {inputAttrs.name === "image" ||
          inputAttrs.name === "logo" ||
          inputAttrs.name === "politicianPhoto" ? (
            <Suspense
              fallback={
                <Skeleton>
                  <Uploader
                    defaultValue={inputAttrs.defaultValue}
                    name={inputAttrs.name}
                  />
                </Skeleton>
              }
            >
              <Uploader
                defaultValue={inputAttrs.defaultValue}
                name={inputAttrs.name}
              />
            </Suspense>
          ) : inputAttrs.name === "font" ? (
            <div className="flex max-w-sm items-center overflow-hidden border-stone-600">
              <Select
                name={inputAttrs.name}
                variant="bordered"
                isRequired
                defaultSelectedKeys={inputAttrs.defaultValue}
                className="w-full bg-white text-sm font-medium text-stone-700 focus:outline-none focus:ring-black dark:bg-black dark:text-stone-200 dark:focus:ring-white"
              >
                <SelectItem variant="bordered" key="font-cal" value="font-cal">
                  Cal Sans
                </SelectItem>
                <SelectItem
                  variant="bordered"
                  key="font-lora"
                  value="font-lora"
                >
                  Lora
                </SelectItem>
                <SelectItem
                  variant="bordered"
                  key="font-work"
                  value="font-work"
                >
                  Work Sans
                </SelectItem>
              </Select>
            </div>
          ) : inputAttrs.name === "subdomain" ? (
            <div className="flex w-full max-w-md">
              <Input
                {...inputAttrs}
                variant="bordered"
                radius="sm"
                isRequired
                className="z-10 flex-1 rounded-l-md border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
              />
              <div className="flex items-center rounded-r-md border-stone-300 bg-stone-100 px-3 text-sm dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400">
                {process.env.NEXT_PUBLIC_ROOT_DOMAIN}
              </div>
            </div>
          ) : inputAttrs.name === "customDomain" ? (
            <div className="relative flex w-full max-w-md">
              <Input
                {...inputAttrs}
                variant="bordered"
                radius="sm"
                isRequired
                className="z-10 flex-1 rounded-md border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
              />
              {inputAttrs.defaultValue && (
                <div className="absolute right-3 z-10 flex h-full items-center">
                  <DomainStatus domain={inputAttrs.defaultValue} />
                </div>
              )}
            </div>
          ) : inputAttrs.name === "description" ? (
            <Textarea
              {...inputAttrs}
              rows={3}
              variant="bordered"
              radius="sm"
              isRequired
              className="w-full max-w-xl rounded-md border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
          ) : inputAttrs.name === "email" || inputAttrs.name === "phone" ? (
            <Suspense
              fallback={
                <Skeleton>
                  <Input
                    {...inputAttrs}
                    variant="bordered"
                    radius="sm"
                    disabled
                    isRequired
                    className="z-10 flex-1 border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
                  />
                </Skeleton>
              }
            >
              <Input
                {...inputAttrs}
                variant="bordered"
                radius="sm"
                isRequired
                className="z-10 flex-1 border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
              />
            </Suspense>
          ) : (
            <Input
              {...inputAttrs}
              variant="bordered"
              radius="sm"
              isRequired
              className="w-full max-w-md rounded-md border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
          )}
        </CardBody>
        {inputAttrs.name === "customDomain" && inputAttrs.defaultValue && (
          <DomainConfiguration domain={inputAttrs.defaultValue} />
        )}
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

export function FormButton({ isEmpty }: { isEmpty?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="bordered"
      radius="sm"
      className={cn(
        "h-8 w-32 focus:outline-none sm:h-10",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      spinner={<LoadingDots color="#808080" />}
      isLoading={pending}
      isDisabled={isEmpty}
    >
      {pending ? "" : "Salvar"}
    </Button>
  );
}
