import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import GoogleLoginButton from "@/components/button/generic-dashboard-button";
import LoginForm from "@/components/form/login-form";
import { getCurrentDomain } from "@/lib/utils";
import GoogleIcon from "@/components/icons/google-icon";

export default function LoginPage() {
  return (
    <div className="mx-auto border border-stone-200 px-3 py-10 sm:w-full sm:max-w-xl sm:rounded-lg sm:shadow-md dark:border-stone-700">
      <Image
        alt="Logo E-Gab"
        width={200}
        height={200}
        className="relative mx-auto h-28 w-auto dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
        src="/logo.png"
      />
      <h1 className="mt-6 text-center text-3xl font-semibold dark:text-white">
        E-Gab
      </h1>
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        Plataforma de gabinete virtual. <br />
        <Link
          className="font-medium dark:text-stone-300 dark:hover:text-stone-100"
          href={getCurrentDomain()}
          rel="noreferrer"
        >
          Leia sobre.
        </Link>
      </p>

      <div className="mx-auto mt-4 flex w-11/12 max-w-xs flex-col gap-4 sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginForm />
        </Suspense>
        <p className="text-gray-400">
          Não tem uma conta? <Link href="/signup">Cadastre-se</Link>
        </p>
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <GoogleLoginButton
            type="signIn"
            Icon={<GoogleIcon />}
            signInProvider="google"
          >
            Google
          </GoogleLoginButton>
        </Suspense>
      </div>
    </div>
  );
}
