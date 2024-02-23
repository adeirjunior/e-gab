/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useTransition } from "react";
import { Post } from "@prisma/client";
import {
  updatePost,
  updatePostMetadata,
} from "@/lib/actions/post/post.update.action";
import TextareaAutosize from "react-textarea-autosize";
import { cn, getCurrentDomain } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";
import { useDebounce } from "usehooks-ts";
import { Editor as NovelEditor } from "novel";
import "@/components/editor/style.css";

export type PostWithSite = Post & {
  website: { subdomain: string | null } | null;
};

export default function Editor({ post }: { post: PostWithSite }) {
  const [isPendingSaving, startTransitionSaving] = useTransition();
  const [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<PostWithSite>(post);
  const debouncedData = useDebounce(data, 750);

  const url = getCurrentDomain(data.website?.subdomain!, `/posts/${data.slug}`);

  useEffect(() => {
    if (
      data.title === post.title &&
      data.description === post.description &&
      data.content === post.content
    ) {
      return;
    }

    startTransitionSaving(async () => {
      try {
        const formData = new FormData();
        formData.append("title", String(debouncedData.title));
        formData.append("description", String(debouncedData.description));
        formData.append("content", String(debouncedData.content));

        if (
          !formData.get("title") ||
          !formData.get("description") ||
          !formData.get("content")
        ) {
          throw new Error(
            "Title, description, and content are required fields.",
          );
        }

        const res = await updatePost(formData, post.id, "post");

        if ("error" in res) {
          toast.error(res.error);
        } else {
          toast.message("Atualizado com sucesso!");
        }
      } catch (error) {
        console.error("Error updating post:", error);
        toast.error("Falha ao atualizar o post. Por favor, tente novamente.");
      }
    });
  }, [debouncedData, startTransitionSaving]);

  const togglePublish = async () => {
    const formData = new FormData();
    formData.append("published", String(!data.published));
    startTransitionPublishing(async () => {
      try {
        if (!data.title || !data.description || !data.content) {
          toast.error("Impossível publicar sem conteúdo.");
        } else {
          const response = await updatePostMetadata(
            formData,
            post.id,
            "published",
          );

          if ('error' in response) {
            toast.error(response.error);
          } else {
            setData((prev) => ({ ...prev, published: !prev.published }));
          }
        }
      } catch (error) {
        console.error("Erro ao atualizar metadata:", error);
        toast.error("Erro ao atualizar metadata do post");
      }
    });
  };

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 dark:border-stone-700 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
      <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
        {data.published && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <div
          className={cn(
            "rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500",
            {
              "bg-stone-100": isPendingSaving,
              "bg-stone-800 text-stone-300": isPendingSaving,
            },
          )}
        >
          {isPendingSaving ? "Salvando..." : "Salvo"}
        </div>
        <Button
          onClick={togglePublish}
          isLoading={isPendingPublishing}
          spinner={<LoadingDots color="#808080" />}
          className={cn(
            "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none",
            {
              "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300":
                isPendingPublishing,
              "border border-black bg-black text-gray-500 hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800":
                !isPendingPublishing,
            },
          )}
          disabled={isPendingPublishing}
        >
          {data.published ? "Despublicar" : "Publicar"}
        </Button>
      </div>
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 dark:border-stone-700">
        <input
          type="text"
          placeholder="Título"
          defaultValue={post.title || ""}
          autoFocus
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="dark:placeholder-text-600 font-cal border-none px-0 text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
        <TextareaAutosize
          placeholder="Descrição"
          defaultValue={post.description || ""}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:bg-black dark:text-white"
        />
        <NovelEditor
          className="relative block"
          disableLocalStorage
          defaultValue={post.content || undefined}
          onUpdate={(editor) => {
            setData((prev) => ({
              ...prev,
              content: editor?.storage.markdown.getMarkdown(),
            }));
          }}
        />
      </div>
    </div>
  );
}
