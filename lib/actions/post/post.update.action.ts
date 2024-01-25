"use server";

import { withPostAuth } from "@/lib/auth";
import {
  OutputBlock,
  OutputBlockData,
  OutputBlockDataItems,
  OutputData,
  Post,
  Website,
} from "@prisma/client";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { nanoid } from "..";
import { put } from "@vercel/blob";
import { diff, getBlurDataURL } from "@/lib/utils";
import { getSession } from "@/lib/auth/get-session";
import { createBlock } from "../editor/editor.create.action";

export interface ExtendedOutputBlock extends OutputBlock {
  data: OutputBlockData & {items: OutputBlockDataItems[]}
}

export const updatePost = async (
  data: Post & {
    content: (OutputData & { blocks: ExtendedOutputBlock[] });
  },
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Não autentificado",
    };
  }

  // Verifique se as propriedades essenciais não estão vazias
  if (!data.title || !data.description || !data.content) {
    return {
      error: "Título, descrição, e conteúdo não podem estar vazios",
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: data.id,
    },
    include: {
      website: true,
      content: {
        include: {
          blocks: {
            include: {
              data: {
                include: {
                  items: true
                }
              }
            },
          },
        },
      },
    },
  });

  if (!post || post.userId !== session.user.id) {
    return {
      error: "Post não encontrado",
    };
  }

  try {
    try {
      await prisma.post.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
        },
      });

      data.content.blocks.map(async (block) => {
        const existingBlock: OutputBlock | null = await prisma.outputBlock.findUnique({
          where: {
            id: block.id,
            outputDataId: data.content.id,
            type: block.type,
          },
        });

        if (!existingBlock) {
          await createBlock(block, data)
        }
      })


    } catch (error: any) {
      console.error("Erro ao atualizar post:", error);
      return {
            error: `Erro ao atualizar post: ${error.message}`,
          };
    }

    // ...

    revalidateTag(
      `${post.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    revalidateTag(
      `${post.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    post.website?.customDomain &&
      (revalidateTag(`${post.website?.customDomain}-posts`),
      revalidateTag(`${post.website?.customDomain}-${post.slug}`));

    return 1;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updatePostMetadata = withPostAuth(
  async (
    formData: FormData,
    post: Post & {
      site: Website;
    },
    key: string,
  ) => {
    const value = formData.get(key) as string;

    try {
      let response;
      if (key === "image") {
        const file = formData.get("image") as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });

        const blurhash = await getBlurDataURL(url);

        response = await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            image: url,
            imageBlurhash: blurhash,
          },
        });
      } else {
        response = await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            [key]: key === "published" ? value === "true" : value,
          },
        });
      }

      revalidateTag(
        `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
      );
      revalidateTag(
        `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
      );

      // if the site has a custom domain, we need to revalidate those tags too
      post.site?.customDomain &&
        (revalidateTag(`${post.site?.customDomain}-posts`),
        revalidateTag(`${post.site?.customDomain}-${post.slug}`));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This slug is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);
