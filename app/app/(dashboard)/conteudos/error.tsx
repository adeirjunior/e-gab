"use client"; // Error components must be Client Components

import { Button, Card } from "@nextui-org/react";
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
    <Card className="container py-10 space-y-6">
      <h2 className=" m-0 text-xl text-gray-300">Ocorreu algum erro!</h2>
      <p className="text-gray-400 m-0">{error.message}</p>
      <Button
        variant="ghost"
        className="text-gray-400"
        onClick={
          () => reset()
        }
      >
        Tente novamente
      </Button>
    </Card>
  );
}
