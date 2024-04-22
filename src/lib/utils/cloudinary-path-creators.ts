"use server"

import { headers } from "next/headers";
import { getWebsiteBySubdomain, getWebsiteByUserId } from "../fetchers/site";

export const userLogoImagePathCreator = async (userId: string, filename: string) => {
  const folderPath = `E-Gab/Users/User ${userId}`;
  return {
    folderPath,
    filePath: `${folderPath}/${filename}`,
  };
};

export const websiteImagePathCreator = async (
  userId: string,
  filename: string,
) => {
  const website = await getWebsiteByUserId(userId);
  if (!website) {
    throw new Error("Não foi possível encontrar o website.");
  }
  const folderPath = `E-Gab/Websites/Website ${website.id}`;
  return {
    folderPath,
    filePath: `${folderPath}/${filename}`,
  };
};

export const websiteImagePathCreatorWithSubdomain = async (
  userId: string,
  filename: string,
) => {
   const subdomain = headers().get('host')?.split('.')[0]
   
  const website = await getWebsiteBySubdomain(subdomain!);
  if (!website) {
    throw new Error("Não foi possível encontrar o website.");
  }
  const folderPath = `E-Gab/Websites/Website ${website.id}`;
  return {
    folderPath,
    filePath: `${folderPath}/${filename}`,
  };
};
