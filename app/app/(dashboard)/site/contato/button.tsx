"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function ContactButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      spinner={<LoadingDots color="#808080" />}
      isLoading={pending}
      className={`${
        pending
          ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
          : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
      } group my-2 flex h-10 w-28 items-center justify-center gap-2 space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700`}
    >
      {pending ? "" : "Salvar"}
    </Button>
  );
}
