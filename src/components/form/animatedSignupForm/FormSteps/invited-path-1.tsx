"use client";
import { inviteCodeHandle } from "@/lib/actions/user/inviteCodeHandle";
import { ButtonContainerLg } from "../ButtonContainerLg";
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
        await inviteCodeHandle(formData);
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    onChange={(e) => setInvitedUserToken(e.target.value)}
                    value={invitedUserToken}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
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
