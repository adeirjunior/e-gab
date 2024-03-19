"use client";

import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchForm({ initialSearch }: { initialSearch: string }) {
  const [tagName, setTagName] = useState(initialSearch ?? "");
  const router = useRouter();

  useEffect(() => {
    setTagName(initialSearch);
  }, [initialSearch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.replace(`/arquivos?q=${encodeURIComponent(tagName)}`);
        router.refresh();
      }}
    >
      <div className="flex gap-2 items-center">
        <Input
          onChange={(e) => setTagName(e.currentTarget.value)}
          label="Pesquisar por tag"
          placeholder="Pesquisar..."
          id="tag-name"
          value={tagName}
        />
        <Button className="grow" type="submit">Pesquisar</Button>
      </div>
    </form>
  );
}
