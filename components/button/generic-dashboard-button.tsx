"use client";

import { ReactNode, useEffect, useTransition } from "react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingDots from "@/components/icons/loading-dots";
import va from "@vercel/analytics";
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

type Prop = {
  create?: (formData: FormData | null, key: string | null) => Promise<any>;
  type: "signIn" | "content";
  children: ReactNode;
  path?: string;
  signInProvider?: any;
  Icon?: JSX.Element;
};

export default function GenericDashboardButton({
  create,
  path,
  signInProvider,
  type,
  Icon,
  children,
}: Prop) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    if (type === "signIn") {
      const errorMessage = Array.isArray(error) ? error.pop() : error;
      errorMessage && toast.error(errorMessage);
    }
  }, [error, type]);

  const handleClick = () => {
    startTransition(async () => {
      if (type === "signIn") {
        signIn(signInProvider);
      } else {
        if (!create) {
          throw new Error("Função create() indefinida.");
        }
        const data = await create(null, null);
        va.track(`Created ${path}`);
        router.refresh();
        router.push(`/conteudos/${path}/${data.id}`);
      }
    });
  };

  return (
    <Button
      onClick={handleClick}
      spinner={<LoadingDots color="#808080" />}
      isLoading={isPending}
      variant="bordered"
      radius="sm"
      className={cn(
        "my-2 space-x-2 border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700",
        isPending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={isPending}
    >
      {Icon}
      {!isPending && children}
    </Button>
  );
}
