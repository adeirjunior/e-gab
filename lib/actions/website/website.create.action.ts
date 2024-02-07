"use server";

import { getSession } from "@/lib/auth/get-session";
import { createPolitician } from "../politician/politician.create.action";
import prisma from "@/lib/configs/prisma";
import { revalidateTag } from "next/cache";
import cloudinary from "@/lib/configs/cloudinary";

export const createSite = async (formData: FormData) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const subdomain = formData.get("subdomain") as string;

  try {
    const politician = await createPolitician();

    if ("error" in politician) {
      return {
        error: "Você já está registrado como um político",
      };
    }

    const response = await prisma.website.create({
      data: {
        name,
        description,
        subdomain,
        cloudinaryDir: "",
        politicianId: politician.id,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        contact: {
          create: {}
        }
      },
    });

    await prisma.website.update({
      where: {
        id: response.id
      },
      data: {
        cloudinaryDir: `E-Gab/Websites/Website ${response.id}`
      }
    })

    revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `Este subdominio já esta em uso`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};
