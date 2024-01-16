import { signIn } from "next-auth/react";
import LoginButton from "../button/login-button";

export default function LoginForm() {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        await signIn("credentials", { email, password });
      }}
    >
      <input
        name="email"
        type="email"
        placeholder="Seu email"
        className="group my-2 flex h-10 w-full items-center justify-center gap-2 space-x-2 rounded-md border border-stone-200 bg-white transition-colors duration-75 hover:bg-stone-50 focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:bg-black dark:hover:border-white dark:hover:bg-black"
      />
      <input
        name="password"
        type="password"
        placeholder="Sua senha"
        className="group my-2 flex h-10 w-full items-center justify-center gap-2 space-x-2 rounded-md border border-stone-200 bg-white transition-colors duration-75 hover:bg-stone-50 focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:bg-black dark:hover:border-white dark:hover:bg-black"
      />
      <LoginButton />
    </form>
  );
}
