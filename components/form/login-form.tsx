"use client"

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import LoadingDots from "../icons/loading-dots";
import { toast } from "sonner";

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);

const handleFormSubmit = async (event: React.FormEvent<EventTarget>) => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    setLoading(true)
    await signIn("credentials", { email, password }).then(() => toast.success("Login feito com sucesso")).catch((err) => {
      toast.error(err)
    })
  } catch (error: any) {
    console.error("Authentication failed:", error);
  } finally {
    setLoading(false)
  }
};

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Seu email"
        className="group my-2 flex h-10 w-full items-center justify-center gap-2 space-x-2 rounded-md border border-stone-200 bg-white px-2 transition-colors duration-75 hover:bg-stone-50 focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:bg-black dark:text-white dark:hover:border-white dark:hover:bg-black"
      />
      <input
        name="password"
        type="password"
        placeholder="Sua senha"
        className="group my-2 flex h-10 w-full items-center justify-center gap-2 space-x-2 rounded-md border border-stone-200 bg-white px-2 transition-colors duration-75 hover:bg-stone-50 focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:bg-black dark:text-white dark:hover:border-white dark:hover:bg-black"
      />
      <Button
        disabled={loading}
        type="submit"
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
    </form>
  );
}
