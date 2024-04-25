"use client";

import PasswordInput from "@/components/form/password-input";
import { checkPassStrengthType } from "@/components/form/signup-form";
import LoadingDots from "@/components/icons/loading-dots";
import { createClient } from "@/lib/actions/client/client.create.action";
import { createUser } from "@/lib/actions/user/user.create.action";
import { editOneKeyUser } from "@/lib/actions/user/user.update.action";
import { getUserByEmail } from "@/lib/fetchers/user";
import { cn } from "@/lib/utils";
import { Button, Input, Link } from "@nextui-org/react";
import { User } from "@prisma/client";
import { hash } from "bcrypt-ts";
import { passwordStrength } from "check-password-strength";
import { Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function Form() {
  const [isPendingUserCreation, startUserCreation] = useTransition();
  const params = useParams<{ error?: string }>();
  const [password, setPassword] = useState<string>("");
  const [passStrength, setPassStrength] = useState<checkPassStrengthType>({
    id: 0,
    value: "Senha muito fraca",
  });
  const router = useRouter();

  const checkPassStrength: (pass: string) => checkPassStrengthType = (pass) => {
    const id = passwordStrength(pass).id;
    return {
      id,
      value:
        id === 1
          ? "Senha fraca"
          : id === 2
            ? "Boa senha"
            : id === 3
              ? "Ótima senha"
              : "Senha muito fraca",
    };
  };

  useEffect(() => {
    setPassStrength(checkPassStrength(password));
  }, [password]);

  const handleFormSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const name = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const hashPass = await hash(password, 10);

    try {
      startUserCreation(async () => {
        const isThereUser = await getUserByEmail(email)
        if (!isThereUser) {
            const user: User = await createUser(name, email, hashPass);
        await editOneKeyUser("client", "role")
        await createClient(user.id);
        if (user) {
          toast.success("Usuário criado");
          router.push("/login");
        } else {
          toast.error("Usuário já existe.");
        }
        } else {
          toast.error("Usuário já existe.");
        }
        
      });
    } catch (error: any) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
      <p className="text-center text-lg font-medium">Registre sua conta</p>

      <div>
        <div className="relative">
          <Input
            id="username"
            name="username"
            type="text"
            className="w-full rounded-lg border-gray-200 text-sm shadow-sm"
            isRequired
            label="Nome de Usuário"
            placeholder="Colocar nome"
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
        <div className="relative">
          <PasswordInput
            name="password"
            type="password"
            className="w-full rounded-lg border-gray-200 text-sm shadow-sm"
            isRequired
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Colocar senha"
          />
        </div>
      </div>

      <p
        className={cn(
          "flex gap-2 p-0 text-sm font-semibold dark:text-gray-300",
          passStrength.id === 0 && "text-danger-300",
          passStrength.id === 1 && "text-yellow-600",
          passStrength.id === 2 && "text-success-300",
        )}
      >
        {password.length > 0 && (
          <>
            {passStrength.value}
            {passStrength.id === 3 && <Check size={20} />}
          </>
        )}
      </p>

      <Button
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white"
        radius="sm"
        disabled={passStrength.id <= 1}
        spinner={<LoadingDots color="#808080" />}
        isLoading={isPendingUserCreation}
      >
        {isPendingUserCreation ? "" : "Cadastrar"}
      </Button>

      <p className="text-center text-sm text-gray-500">
        Tem uma conta?
        <Link className="underline" href="/login">
          Entre
        </Link>
      </p>
    </form>
  );
}
