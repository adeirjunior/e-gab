"use client"

import LoadingDots from "@/components/icons/loading-dots";
import { sendInviteEmail } from "@/lib/actions/email/send-invite-email";
import { Button, Input } from "@nextui-org/react";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

const handleClick = async (formData: FormData) => {
    try {
        const email = await sendInviteEmail(formData);

        if(email?.error) {
          toast.error(email?.error.message);
        }


        
    } catch (error: any) {
        console.log(error.message)
    }
}

export default function Page() {
  const { pending } = useFormStatus();
  const [input, setInput] = useState<string>()
  
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
          setInput(e.target.value)
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