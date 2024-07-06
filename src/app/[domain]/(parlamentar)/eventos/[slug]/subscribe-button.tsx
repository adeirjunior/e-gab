"use client"

import LoadingDots from '@/components/icons/loading-dots';
import { Button, ButtonProps } from '@nextui-org/react';
import { Website } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { ReactNode, useTransition } from 'react';

type Prop = {
  subscribe?: (
    userId: string | null,
    event:
      | (Event & {
          website: Website;
        })
      | null,
  ) => Promise<any>;
  userId?: string;
  event?: Event & {
    website: Website;
  };
  children: ReactNode;
  buttonProps?: ButtonProps;
};

export default function SubscribeButton(
  {buttonProps, children, subscribe, userId, event}: Prop,
) { 
    const [isPending, startTransition] = useTransition();
    const {status} = useSession()

    const handleClick = () => {
      startTransition(async () => {
          if (!subscribe) {
            throw new Error("Função subscribe() indefinida.");
          } else {
            const data = await subscribe(userId!, event!);
          }
      });
    };
  return (
    <Button  disabled={status !== "authenticated" || isPending} onClick={handleClick}
      spinner={<LoadingDots color="#ffffff" />}
      isLoading={isPending} color="primary" className="-mb-2 w-full sm:w-32" {...buttonProps}>
       {status !== "authenticated" || !isPending && children}
    </Button>
  );
} 
