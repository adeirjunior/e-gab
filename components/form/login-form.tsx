"use client"

import LoadingDots from "../icons/loading-dots";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const [loading, setLoading] = useState<boolean>(false);
  return (
    <form className="mb-6" action="">
      <input
        type="email"
        placeholder="Seu email"
        className="group my-2 flex h-10 w-full items-center justify-center gap-2 space-x-2 rounded-md border border-stone-200 bg-white transition-colors duration-75 hover:bg-stone-50 focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:bg-black dark:hover:border-white dark:hover:bg-black"
      />
      <input
        type="password"
        placeholder="Sua senha"
        className="group my-2 flex h-10 w-full items-center justify-center gap-2 space-x-2 rounded-md border border-stone-200 bg-white transition-colors duration-75 hover:bg-stone-50 focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:bg-black dark:hover:border-white dark:hover:bg-black"
      />
      <button
        disabled={loading}
        onClick={() => {
          setLoading(true);
          signIn("github");
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
          <>
            <p className="m-0 text-sm font-medium text-stone-600 dark:text-stone-400">
              Entrar
            </p>
          </>
        )}
      </button>
    </form>
  );
}
