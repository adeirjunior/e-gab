"use client";

import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import LoadingDots from "../icons/loading-dots";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/auth/get-session";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isPendingUserLogin, startUserLogin] = useTransition();
  const router = useRouter();

  const handleFormSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      startUserLogin(async () => {
        await signIn("credentials", { email, password, redirect: false });
        const session = await getSession();

        console.log(session);

        if (!session) {
          toast.error("Esta conta não existe.");
          router.push("/signup");
        } else {
          toast.success("Login feito com sucesso.");
          router.push("/");
        }
      });
    } catch (error: any) {
      toast.error("Autentificação falhou:", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleFormSubmit}>
      <Input
        variant="bordered"
        name="email"
        isRequired
        type="email"
        label="Email"
        className="w-full border-stone-200 bg-white hover:bg-stone-50 focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:bg-black dark:text-white dark:hover:border-white dark:hover:bg-black"
      />
      <Input
        variant="bordered"
        name="password"
        isRequired
        type="password"
        label="Email"
        className="w-full border-stone-200 bg-white hover:bg-stone-50 focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:bg-black dark:text-white dark:hover:border-white dark:hover:bg-black"
      />
      <Button
        type="submit"
        className={cn(
          isPendingUserLogin
            ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
            : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black",
          "my-2 flex h-10 w-full space-x-2 border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700",
        )}
        variant="bordered"
        radius="sm"
        disabled={isPendingUserLogin}
        spinner={<LoadingDots color="#808080" />}
        isLoading={isPendingUserLogin}
      >
        {isPendingUserLogin ? "" : "Entrar"}
      </Button>
    </form>
  );
}
