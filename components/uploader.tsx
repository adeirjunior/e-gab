"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Input } from "@nextui-org/react";
import { Grid } from "@tremor/react";
import { cn } from "@/lib/utils";

export default function Uploader({ name }: { name: string }) {
  const [data, setData] = useState<{
    image: string | null;
  }>({
    image: null,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);

  const handleUpload = (file: File | null) => {
    if (file) {
      if (file.size / 1024 / 1024 > 5) {
        toast.error("File size too big (max 5MB)");
      } else if (
        !file.type.includes("png") &&
        !file.type.includes("jpg") &&
        !file.type.includes("jpeg") &&
        !file.type.includes("webp")
      ) {
        toast.error("Invalid file type (must be .png, .jpg, .jpeg, or .webp)");
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          setData((prev) => ({ ...prev, [name]: e.target?.result as string }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Grid className="grid gap-6">
      <div>
        <div className="mb-4 space-y-1">
          <h2 className="text-xl font-semibold">Upload de arquivo</h2>
          <p className="text-sm text-gray-500">
            Formatos aceitos: .png, .jpg, .gif, .mp4
          </p>
        </div>
        <label
          htmlFor={name}
          className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md shadow-sm transition-all"
        >
          <div
            className="absolute z-[5] h-full w-full rounded-md"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            const file = e.dataTransfer.files && e.dataTransfer.files[0];
            inputRef.current!.files = e.dataTransfer.files; // set input file to dropped file
            handleUpload(file);
            }}
          />
          <div
            className={cn(
              "absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md border-3 border-stone-900 px-10 transition-all dark:border-stone-600 dark:bg-stone-800",
              dragActive && "border-4 border-black",
              data.image
                ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
                : "bg-white opacity-100 hover:bg-gray-50",
            )}
          >
            <svg
              className={cn(
                dragActive ? "scale-110" : "scale-100",
                "h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95 dark:border-stone-500",
              )}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M12 12v9"></path>
              <path d="m16 16-4-4-4 4"></path>
            </svg>
            <p className="mt-2 text-center text-sm text-gray-500 dark:border-stone-500">
              Arraste e solte ou clique para fazer upload.
            </p>
            <p className="mt-2 text-center text-sm text-gray-500 dark:border-stone-500">
              Tamanho máximo: 5MB
            </p>
            <span className="sr-only">Upload de arquivo</span>
          </div>
          {data.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <Input
            id={name}
            name={name}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
            const file = e.currentTarget.files && e.currentTarget.files[0];
            handleUpload(file);
          }}
          />
        </div>
      </div>
    </Grid>
  );
}
