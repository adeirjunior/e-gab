import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import GoogleLoginButton from "@/components/button/google-login-button";
import LoginForm from "@/components/form/login-form";

export default function LoginPage() {
  return (
    <div className="mx-3 border border-stone-200 px-3 py-10 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md dark:border-stone-700">
      <Image
        alt="Platforms Starter Kit"
        width={100}
        height={100}
        className="relative mx-auto h-12 w-auto dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
        src="/logo.png"
      />
      <h1 className="mt-6 text-center text-3xl font-semibold dark:text-white">
        E-Gab
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        Plataforma de gabinete virtual. <br />
        <Link
          className="font-medium dark:text-stone-300 dark:hover:text-stone-100"
          href={
            process.env.NEXTAUTH_URL
              ? "http://localhost:3000"
              : `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          }
          rel="noreferrer"
        >
          Leia sobre.
        </Link>
      </p>

      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginForm />
        </Suspense>
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <GoogleLoginButton />
        </Suspense>
      </div>
    </div>
  );
}
