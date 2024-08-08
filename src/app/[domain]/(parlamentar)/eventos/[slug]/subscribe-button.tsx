"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { toggleEventConnection } from "@/lib/actions/event";
import { Button, ButtonProps } from "@nextui-org/react";
import { Event, EventLocation, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useEffectOnce } from "usehooks-ts";

type Prop = {
  event: Event & {
    eventLocation: EventLocation;
    usersWhoSubscripted: User[];
  };
  buttonProps?: ButtonProps;
};

export default function SubscribeButton({ buttonProps, event }: Prop) {
  const [isPending, startTransition] = useTransition();
  const { status, data: session } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffectOnce(() => {
    if (session) {
      const isUserSubscribed = event.usersWhoSubscripted.some(
        (user) => user.id === session.user.id,
      );
      setIsSubscribed(isUserSubscribed);
    }
  });

  const handleClick = () => {
    startTransition(async () => {
      if (session) {
        await toggleEventConnection(session.user.id, event).then((res) => {
          if ("error" in res) {
            // Handle error
          } else {
            const isUserSubscribed = res.usersWhoSubscripted.some(
              (user) => user.id === session.user.id,
            );
            setIsSubscribed(isUserSubscribed);
            toast(res.usersWhoSubscripted.length);
          }
        });
      }
    });
  };

  return (
    <Button
      disabled={status !== "authenticated" || isPending}
      onClick={handleClick}
      spinner={<LoadingDots color="#ffffff" />}
      isLoading={isPending}
      color="primary"
      className="-mb-2 w-full sm:w-32"
      {...buttonProps}
    >
      {status !== "authenticated" ? "" : isSubscribed ? "Inscrito" : "Inscrever-se"}
    </Button>
  );
}
