import { Button } from "@nextui-org/react";
import { useState } from "react";
import LoadingDots from "../icons/loading-dots";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt-ts";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function SignupForm() {

  return (
    <form action={async (formData: FormData) => {
      "use server"
      const name = formData.get("name") as string
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      const hashPass = await hash(password, 10)

      try {

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashPass
        }
      })

      } catch(err) {
        console.log(err)
      }
    }}>
      <input
        name="name"
        type="text"
        placeholder="Seu nome"
        className="group my-2 flex h-10 w-full items-center justify-center gap-2 space-x-2 rounded-md border border-stone-200 bg-white px-2 transition-colors duration-75 hover:bg-stone-50 focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:bg-black dark:text-white dark:hover:border-white dark:hover:bg-black"
      />
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
        type="submit"
        className="bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black group my-2 flex h-10 w-full items-center justify-center gap-2 space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700"
      >
          <p className="m-0 text-sm font-medium text-stone-600 dark:text-stone-400">
            Cadastre-se
          </p>
      </Button>
    </form>
  );
}
