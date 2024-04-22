"use client"

import { Button, cn } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import LoadingDots from "../icons/loading-dots";

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
