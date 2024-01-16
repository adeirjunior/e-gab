"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={loading}
      type="button"
      onClick={() => {
        setLoading(true);
      }}
      className={`${
        loading
          ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
          : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
      } group my-2 flex h-10 w-full items-center justify-center gap-2 space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700`}
    >
      {loading ? (
        <LoadingDots color="#A8A29E" />
      ) : (
        <p className="m-0 text-sm font-medium text-stone-600 dark:text-stone-400">
          Entrar
        </p>
      )}
    </Button>
  );
}
