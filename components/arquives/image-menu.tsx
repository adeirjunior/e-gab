"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "../icons/menu";
import { AddToAlbumDialog } from "../modal/add-to-album-dialog";
import { useState } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { SearchResult } from "@/lib/types/types";

export function ImageMenu({
  image,
}: {
  image: SearchResult;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute right-2 top-2">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="h-8 w-8 p-0">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem asChild>
            <AddToAlbumDialog
              image={image}
              onClose={() => setOpen(false)}
            />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              className="flex cursor-pointer justify-start pl-4"
              asChild
              variant="ghost"
            >
              <Link
                href={`/arquivos/alterar/${encodeURIComponent(
                  image.public_id,
                )}`}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
