"use client";

import va from "@vercel/analytics";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { Suspense, useState } from "react";
import { FormButton } from "../button/form-button";
import { SearchResult } from "@/lib/types/types";
import FilesModal from "../modal/files-modal";
import { CldImage } from "next-cloudinary";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ImageForm({
  title,
  description,
  helpText,
  inputAttrs,
  handleSubmit,
  resources,
}: {
  title: string;
  description: string;
  helpText: string;
  inputAttrs: {
    name: "image" | "logo" | "politicianPhoto";
    defaultValue: string;
    placeholder?: string;
  };
  resources: SearchResult[];
  handleSubmit: any;
}) {
const { id } = useParams() as { id?: string };
  const [file, setFile] = useState<string>(inputAttrs.defaultValue);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { update } = useSession();

  return (
    <form
      action={async () => {
        const data = new FormData();
        data.append(inputAttrs.name, file);
        handleSubmit(data, id, inputAttrs.name).then(async (res: any) => {
          if (res.error) {
            console.error(res.error);
            toast.error(
              `Erro ao atualizar imagem: ${JSON.stringify(res.error)}`,
            );
          } else {
            va.track(`Updated ${inputAttrs.name}`);
            await update();
            toast.success("Imagem atualizada!");
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
          <Suspense fallback={<p>Carregando...</p>}>
            <Card
              isPressable
              onPress={onOpen}
              className="relative max-w-[400px]"
              style={{
                aspectRatio: inputAttrs.name === "image" ? "16 / 9" : "1 / 1",
              }}
            >
              <CldImage alt="" fill crop="fill" aspectRatio="1:1" src={file} />
            </Card>
            <FilesModal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              setFile={setFile}
              resources={resources}
            />
          </Suspense>
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
