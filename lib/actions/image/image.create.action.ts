"use server";

import { getSession } from "@/lib/auth/get-session";
import cloudinary from "@/lib/configs/cloudinary";
import { getWebsiteByUserId } from "@/lib/fetchers/site";
import { SearchResult } from "@/lib/types/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function create(formData: FormData, type?: "logo" | "image") {
  const session = await getSession();

  if (!session) {
    throw new Error("Erro");
  }

  const file = formData.get(type === "logo" ? type : "image") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    let path: string;
    const filename = "profile_image";

    const upload = async () =>
      await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream(
            {
              tags: ["nextjs-server-actions-upload-sneakers"],
              folder: path,
              ...(type === "logo" && {
                unique_filename: true,
                public_id: filename,
                discard_original_filename: true,
              }),
            },
            function (error: any, result: unknown) {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            },
          )
          .end(buffer);
      });

    if (type === "logo") {
      path = `E-Gab/Users/User ${session.user.id}`;
      await upload();
      revalidatePath("/configuracoes");
    } else {
      const website = await getWebsiteByUserId(session.user.id);
      if (!website) {
        throw new Error("Erro");
      }
      path = `E-Gab/Websites/Website ${website.id}`;
      await upload();
      revalidatePath("/arquivos");
    }

    return type === "logo" ? `${path}/${filename}` : path;
  } catch (error) {}
}

function excludeCommonPath(basePath: string, excludePath: string): string {
  const remainingPath = excludePath.substring(basePath.length);

  return remainingPath;
}

export const createWebsiteFolder = async (id: string) => {
  await cloudinary.v2.api.create_folder(`E-Gab/Websites/Website ${id}`);
};

export async function setAsFavoriteAction(
  publicId: string,
  isFavorite: boolean,
) {
  if (isFavorite) {
    await cloudinary.v2.uploader.add_tag("favorite", [publicId]);
  } else {
    await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
  }
}

export async function addImageToAlbum(image: SearchResult, album: string) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
    return {
      error: "Você não está logado.",
    };
  }

  const { cloudinaryDir: websiteCloudinaryDir } = await getWebsiteByUserId(
    session.user.id,
  );

  await cloudinary.v2.api.create_folder(`${websiteCloudinaryDir}/${album}`);

  let parts = image.public_id.split("/");
  if (parts.length > 1) {
    parts = parts.slice(1);
  }
  const publicId = parts.join("/");

  await cloudinary.v2.uploader.rename(
    image.public_id,
    `${websiteCloudinaryDir}/${album}/${excludeCommonPath(
      websiteCloudinaryDir,
      publicId,
    )}`,
  );
}
