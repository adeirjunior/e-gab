"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { deletePost } from "@/lib/actions/post/post.delete.action";
import va from "@vercel/analytics";
import {
  Button,
  ButtonProps,
  Input,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";

export default function DeletePostForm({ postName }: { postName: string }) {
  const { id } = useParams() as unknown as { id: string };
  const router = useRouter();
  const [input, setInput] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { pending } = useFormStatus();
  return (
    <form
      action={async (data: FormData) =>
        window.confirm("Tem certeza que quer deletar seu post?") &&
        (await deletePost(data, id, "delete").then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track("Post deletado.");
            router.refresh();
            router.push(`/site`);
            toast.success(`Post deletado com sucesso!`);
          }
        }))
      }
      className="rounded-lg border-2 border-red-600 bg-white dark:bg-black"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="font-cal text-xl dark:text-white">Deletar Post</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Deleta o seu post permanentemente. Escreva o nome do seu post{" "}
          <b>{postName}</b> para confirmar.
        </p>

        <Input
          name="confirm"
          type="text"
          required
          value={input}
          onValueChange={setInput}
          pattern={postName}
          placeholder={postName}
          variant="bordered"
          className="w-full max-w-md rounded-md text-sm text-stone-900 placeholder-stone-300 dark:placeholder-stone-700"
        />
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-center text-sm text-stone-500 dark:text-stone-400">
          Esta ação é irreversível. Favor prosseguir com cautela.
        </p>
        <div className="w-32">  
        </div>
      </div>
    </form>
  );
}
