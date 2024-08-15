"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import va from "@vercel/analytics";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteContentForm({
  contentName,
  children,
  handle,
}: {
  contentName: string;
  children: string;
  handle: (formData: FormData, id: string, key: string) => Promise<any>;
}) {
  const { id } = useParams() as unknown as { id: string };
  const router = useRouter();
  const [input, setInput] = useState("");
  const { pending } = useFormStatus();
  return (
    <form
      action={async (data: FormData) =>
        window.confirm("Tem certeza que quer deletar?") &&
        (await handle(data, id, "delete").then((res: any) => {
          if (res.error) {
            toast.error(res.error)
          } else {
            va.track("Conteúdo deletado.")
            router.refresh()
            router.push(`/conteudos`)
          }
        }))
      }
      className={cn("rounded-lg border-2 border-red-600 bg-white dark:bg-black")}
    >
      <div className={cn("relative flex flex-col space-y-4 p-5 sm:p-10")}>
        <h2 className={cn("font-cal text-xl dark:text-white")}>{children}</h2>
        <p className={cn("text-sm text-stone-500 dark:text-stone-400")}>
          Deleta o conteúdo permanentemente. Escreva o nome <b>{contentName}</b>{" "}
          para confirmar.
        </p>

        <Input
          name="confirm"
          type="text"
          required
          value={input}
          onValueChange={setInput}
          pattern={contentName}
          placeholder={contentName}
          variant="bordered"
          className={cn(
            "w-full max-w-md rounded-md text-sm text-stone-900 placeholder-stone-300 dark:text-white dark:placeholder-stone-700",
          )}
        />
      </div>

      <div
        className={cn(
          "flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10",
        )}
      >
        <p
          className={cn(
            "text-center text-sm text-stone-500 dark:text-stone-400",
          )}
        >
          Esta ação é irreversível. Favor prosseguir com cautela.
        </p>
        <div className={cn("w-32")}>
          <Button
            type="submit"
            variant="bordered"
            radius="sm"
            className={cn(
              "h-8 w-32 focus:outline-none sm:h-10",
              pending || !input
                ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
            )}
            spinner={<LoadingDots color="#808080" />}
            isLoading={pending}
            disabled={!input}
          >
            {pending ? "" : "Deletar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
