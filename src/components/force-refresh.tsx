"use client";

import { useRouter } from "next/navigation";
import { useEffectOnce } from "usehooks-ts";

export function ForceRefresh() {
  const router = useRouter();

  useEffectOnce(() => {
    router.refresh();
  });

  return <></>;
}
