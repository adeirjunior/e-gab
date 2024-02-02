"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import LoadingDots from "@/components/icons/loading-dots"; 
import { toast } from "sonner";
import { getSession } from "@/lib/auth/get-session";
import { useRouter } from "next/navigation";

export default function LoginForm() {
   const [isPendingUserLogin, startUserLogin] = useTransition();
   const router = useRouter();

   const handleFormSubmit = async (event: React.FormEvent<EventTarget>) => {
     event.preventDefault();

     const formData = new FormData(event.target as HTMLFormElement);
     formData.append('role', 'Client')

     const email = formData.get("email");
     const password = formData.get("password");
     const role = formData.get("role");

     try {
       startUserLogin(async () => {
         await signIn("credentials", { email, password, role, redirect: false });
         const session = await getSession()

         console.log(session);

         if (!session) {
           toast.error("Esta conta não existe.");
         } else {
           toast.success("Login feito com sucesso.");
           router.push("/")
         }
       });
     } catch (error: any) {
       toast.error("Autentificação falhou:", error);
     }
   };

  return (
    <form className="space-y-4" onSubmit={handleFormSubmit}>
      <p className="text-center text-lg font-medium">Entrar na sua conta</p>

      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>

        <div className="relative">
          <Input
            name="email"
            type="email"
            className="w-full rounded-lg border-gray-200 text-sm shadow-sm"
            isRequired
            label="Email"
            placeholder="Colocar email"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>

        <div className="relative">
          <Input
            name="password"
            type="password"
            className="w-full rounded-lg border-gray-200 text-sm shadow-sm"
            isRequired
            label="Senha"
            placeholder="Colocar senha"
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>

      <Button
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white"
        disabled={isPendingUserLogin}
        spinner={<LoadingDots color="#808080" />}
        isLoading={isPendingUserLogin}
      >
        {isPendingUserLogin ? "" : "Entrar"}
      </Button>

      <p className="text-center text-sm text-gray-500">
        Não possui uma conta?
        <Link className="underline" href="/signup">
          Registre-se
        </Link>
      </p>
    </form>
  );}