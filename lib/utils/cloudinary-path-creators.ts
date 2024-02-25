"use server"

import { getWebsiteByUserId } from "../fetchers/site";

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
    throw new Error("Erro");
  }
  const folderPath = `E-Gab/Websites/Website ${website.id}`;
  return {
    folderPath,
    filePath: `${folderPath}/${filename}`,
  };
};
