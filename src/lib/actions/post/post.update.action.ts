"use server";

import { withPostAuth } from "@/lib/auth";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import { hasSubscription } from "@/lib/helpers/billing";
import { getSession } from "@/lib/auth/get-session";

export const updatePost = withPostAuth(async (formData, post) => {
  try {
      const session = await getSession();
      if (!session?.user.id) {
        return {
          error: "Not authenticated",
        };
      }

      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });

      const hasSub = await hasSubscription();

      if (user?.role === "politician" && !hasSub) {
        return {
          error: `Você precisa assinar um plano para realizar este comando.`,
        };
      }


    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    if (!title || !description || !content) {
      throw new Error("Title, description, and content are required fields.");
    }

    const response = await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        title,
        description,
        content,
      },
    });

    if (!response) {
      throw new Error("Failed to update post.");
    }

    revalidateTag(
      `${post.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    revalidateTag(
      `${post.website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    if (post.website?.customDomain) {
      revalidateTag(`${post.website?.customDomain}-posts`);
      revalidateTag(`${post.website?.customDomain}-${post.slug}`);
    }

    return response;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
});

export const updatePostMetadata = withPostAuth(async (formData, post, key) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const hasSub = await hasSubscription();

  if (user?.role === "politician" && !hasSub) {
    return {
      error: `Você precisa assinar um plano para realizar este comando.`,
    };
  }


  const value = formData.get(key) as string;

  try {
    const response = await prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          [key]: key === "published" ? value === "true" : value,
        },
      });

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
});
