"use client";

import { Button, Card, Image } from "@nextui-org/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card className="container dark:bg-black space-y-6 py-10">
      <div className="mt-20 flex flex-col items-center space-x-4">
        <h1 className="font-cal text-4xl">401</h1>
        <Image
          alt="missing site"
          src="https://illustrations.popsy.co/gray/falling.svg"
          width={400}
          height={400}
        />
        <p className="text-lg text-stone-500">{error.message}</p>
      </div>
      <Button variant="ghost" className="text-gray-400" onClick={() => reset()}>
        Tente novamente
      </Button>
    </Card>
  );
}
