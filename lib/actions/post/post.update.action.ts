"use server";

import { withPostAuth } from "@/lib/auth";
import {
  OutputBlock,
  OutputBlockData,
  OutputData,
  Post,
  Website,
} from "@prisma/client";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { nanoid } from "..";
import { put } from "@vercel/blob";
import { getBlurDataURL } from "@/lib/utils";
import { getSession } from "@/lib/auth/get-session";

export interface ExtendedOutputBlock extends OutputBlock {
  data: OutputBlockData;
}

export const updatePost = async (
  data: Post & {
    content: (OutputData & { blocks: ExtendedOutputBlock[] }) | null;
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
              data: true,
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
      const postResponse = await prisma.post.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
          // Adicione outros campos, se necessário
        },
      });

      // Processar postResponse ou verificar erros

      // Iterar sobre os blocos de conteúdo
      for (const block of data.content.blocks) {
        try {
          if (block.id) {
            // Se o bloco tiver um id, atualize o bloco existente
            const blockResponse = await prisma.outputBlock.update({
              where: { id: block.id },
              data: { type: block.type },
            });
            // Processar blockResponse ou verificar erros

            // Verificar se block.data existe antes de tentar atualizar
            if (block.data && block.data.id && block.data.outputBlockId) {
              const blockDataResponse = await prisma.outputBlockData.update({
                where: {
                  id: block.data.id,
                  outputBlockId: block.data.outputBlockId,
                },
                data: { text: block.data.text },
              });
              // Processar blockDataResponse ou verificar erros
            }
          } else {
            // Se o bloco não tiver um id, é um novo bloco, então insira um novo bloco
            const newBlockResponse = await prisma.outputBlock.create({
              data: {
                type: block.type,
                outputDataId: data.content.id,
              },
            });
            // Processar newBlockResponse ou verificar erros

            // Verificar se block.data existe antes de tentar criar
            if (block.data) {
              const newBlockDataResponse = await prisma.outputBlockData.create({
                data: {
                  text: block.data.text,
                  outputBlockId: newBlockResponse.id,
                },
              });
              // Processar newBlockDataResponse ou verificar erros

              // Agora você precisa associar os novos blocos ao post
              // Por exemplo, assumindo que você tenha um outputDataId para cada bloco
              const newOutputDataResponse = await prisma.outputData.create({
                data: { blocks: { connect: [{ id: newBlockResponse.id }] } },
              });
              // Processar newOutputDataResponse ou verificar erros

              // Atualizar o post para vincular ao novo OutputData
              const updatePostResponse = await prisma.post.update({
                where: { id: data.id },
                data: { outputDataId: newOutputDataResponse.id },
              });
              // Processar updatePostResponse ou verificar erros
            }
          }
        } catch (error: any) {
          console.error(block);
          
          return {
            error: `Erro ao processar bloco: ${error.message}`,
          };
        }
      }
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
