"use client";
import { inviteCodeHandle } from "@/lib/actions/user/inviteCodeHandle";
import { useNewUserSteps } from "@/lib/context/new-user-steps-context";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import LoadingDots from "@/components/icons/loading-dots";
import { toast } from "sonner";

const formSchema = z.object({
  inviteToken: z.string().min(2).max(50),
});

export const InvitedPath1 = () => {
  const { invitedUserToken, setInvitedUserToken } = useNewUserSteps();
  const [pending, start] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inviteToken: "",
    },
  });

  function onSubmit(formData: FormData) {
    try {
      start(async () => {
        const data = await inviteCodeHandle(formData);

        if('error' in data!) {
toast.error(JSON.stringify(data.error!))
        } else {
toast.success(data.role)
        }
      });
    } catch (error) {}
  }

  return (
    <div>
      <Form {...form}>
        <form action={onSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="inviteToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Escreva seu código</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0000-0000-0000-0000-000000000000"
                    {...field}
                    onChange={(e) => setInvitedUserToken(e.target.value)}
                    value={invitedUserToken}
                  />
                </FormControl>
                <FormDescription>
                  Ele foi enviado para seu email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={pending}
            spinner={<LoadingDots color="#808080" />}
            isLoading={pending}
            type="submit"
          >
            {pending ? "" : "Enviar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
