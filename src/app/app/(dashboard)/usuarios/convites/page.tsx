"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { checkAdmin } from "@/lib/actions/admin/admin.check.action";
import { sendInviteEmail } from "@/lib/actions/email/send-invite-email";
import { checkInvite } from "@/lib/actions/invite/invite.check.action";
import { checkPolitician } from "@/lib/actions/politician/politician.check.action";
import { Button, Input } from "@nextui-org/react";
import { Mail } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function Page() {
  const [pending, start] = useTransition();
  const [input, setInput] = useState<string>();

  const handleClick = (formData: FormData) => {
    try {
      start(async () => {
        const alredyExistInvite = await checkInvite(formData);
        const alredyExistAdmin = await checkAdmin(formData);
        const isPolitician = await checkPolitician(formData);

        if (alredyExistAdmin) {
          toast.error("Este usuário já esta registrado.");
        } else {
          if (isPolitician) {
            toast.error("Este usuário é o político.");
          } else {
            if (alredyExistInvite) {
              toast.error(
                "Você já enviou um convite para este usuário. Espere até que se passem 15 minutos para inviar outro.",
              );
            } else {
              const email = await sendInviteEmail(formData);

              if (email?.error) {
                toast.error(email?.error.message);
              }

              toast.success("Convite enviado.");
            }
          }
        }
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form
      action={handleClick}
      className="w-full space-y-4 rounded-xl border-3 border-stone-800 p-4"
    >
      <Input
        startContent={<Mail />}
        required
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        name="email"
        type="email"
        label="Email"
        placeholder="nome@exemplo.com"
        labelPlacement="outside"
        description="Escreva o email do usúario que você deseja convidar para administrar seu site."
      />
      <Button
        spinner={<LoadingDots color="#808080" />}
        isLoading={pending}
        className="float-end border-3"
        disabled={!input ? true : false}
        variant="bordered"
        type="submit"
      >
        {!pending && "Enviar"}
      </Button>
    </form>
  );
}
