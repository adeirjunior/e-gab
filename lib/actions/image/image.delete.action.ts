"use server"

import cloudinary from "@/lib/configs/cloudinary";
import axios from 'axios';
import { createHash } from "crypto";

const generateSHA1 = (data: any) => {
  const hash = createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const handleDeleteImage = async (publicId) => {
  const cloudName = "your_cloud_name";
  const timestamp = new Date().getTime();
  const apiKey = "your_api_key";
  const apiSecret = "your_api_secret";
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  try {
    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });

    console.error(response);
  } catch (error) {
    console.error(error);
  }
};

export const deleteWebsiteFolder = async (id: string) => {
  await cloudinary.v2.api.delete_folder(`E-Gab/Websites/Website ${id}`);
};

export const deleteImage = async (websiteId: string, imageId: string) => {
  await cloudinary.v2.api.delete_resources(
    [`E-Gab/Websites/Website ${websiteId}/${imageId}`],
    { type: "upload", resource_type: "image" },
  );
};
