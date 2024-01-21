"use client";

import { Button, Input } from "@nextui-org/react";
import { hash } from "bcrypt-ts";
import { toast } from "sonner";
import { passwordStrength } from "check-password-strength";
import { useState, useTransition, useEffect } from "react";
import LoadingDots from "../icons/loading-dots";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/user";
import { useEffectOnce } from "usehooks-ts";

type checkPassStrengthType = {
  id: number;
  value: "Senha muito fraca" | "Senha fraca" | "Boa senha" | "Ótima senha";
};

export default function SignupForm() {
  const [isPendingUserCreation, startUserCreation] = useTransition();
  const params = useParams<{ error?: string }>();
  const [password, setPassword] = useState<string>("");
  const [passStrength, setPassStrength] = useState<checkPassStrengthType>({
    id: 0,
    value: "Senha muito fraca",
  });

  const router = useRouter();

  useEffectOnce(() => {
    if (params.error === "notLogged") {
      toast.error("Esta conta não existe.");
    }
  });

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

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const hashPass = await hash(password, 10);

    try {
      startUserCreation(async () => {
        await createUser(name, email, hashPass).then(() => {
          toast.success("Usuário criado");
          router.push("/login");
        });
      });
    } catch (error: any) {
      console.error("Authentication failed:", error);
    } finally {
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleFormSubmit}>
      <Input
        variant="bordered"
        isRequired
        name="name"
        type="text"
        label="Nome"
        className="w-full border-stone-200 bg-white hover:bg-stone-50 focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:bg-black dark:text-white dark:hover:border-white dark:hover:bg-black"
      />
      <Input
        variant="bordered"
        name="email"
        isRequired
        type="email"
        label="Email"
        className="w-full border-stone-200 bg-white hover:bg-stone-50 focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:bg-black dark:text-white dark:hover:border-white dark:hover:bg-black"
      />
      <Input
        label="Senha"
        isRequired
        variant="bordered"
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        type="password"
        className="w-full border-stone-200 bg-white hover:bg-stone-50 focus:outline-none active:bg-stone-100 dark:border-stone-700 dark:bg-black dark:text-white dark:hover:border-white dark:hover:bg-black"
      />
      <p
        className={cn(
          "flex gap-2 p-0 text-sm font-semibold text-gray-300",
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
        className={cn(
          isPendingUserCreation || passStrength.id < 2
            ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
            : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black",
          "my-2 flex h-10 w-full space-x-2 border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700",
        )}
        variant="bordered"
        radius="sm"
        disabled={passStrength.id <= 1}
        spinner={<LoadingDots color="#808080" />}
        isLoading={isPendingUserCreation}
      >
        {isPendingUserCreation ? "" : "Cadastre-se"}
      </Button>
    </form>
  );
}
