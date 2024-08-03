"use client"; // Error components must be Client Components

import { Button } from "@nextui-org/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
        <div className="flex flex-col items-center justify-center rounded-lg bg-white px-4 py-8 md:px-8 lg:px-24">
          <h1 className="text-6xl font-bold tracking-wider text-gray-300 md:text-7xl lg:text-9xl">
            Erro
          </h1>
          <h2 className="mt-4 text-2xl font-bold tracking-wider text-gray-500 md:text-3xl lg:text-5xl">
            Alguma coisa deu errado!
          </h2>
          <p className="mt-4 border-b-2 pb-4 text-center text-gray-500">
            {error.message}
          </p>
          <Button
            startContent={
              <ReloadIcon/>
            }
            type="button"
            onClick={() => reset()}
            className="mt-6 flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-gray-100 transition duration-150 hover:bg-blue-700"
            title="Tentar novamente"
          >
            Tente novamente
          </Button>
        </div>
  );
}
