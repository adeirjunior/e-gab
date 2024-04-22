"use server"

import cloudinary from "@/lib/configs/cloudinary";
import { SearchResult } from "@/lib/types/types";
import { getWebsiteBySubdomain } from "@/lib/fetchers/site";

export const getGalleryImagesWithTags = async (subdomain:string, tags:string[]) => {
      const website = await getWebsiteBySubdomain(subdomain);

    return (await cloudinary.v2.search
      .expression(`folder="${website?.cloudinaryDir}/*" AND tags=${tags.map((tag, index) => index === 0 ? tag : `,${tag}`)}`)
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(30)
      .execute()) as { resources: SearchResult[] };
}

export const getGalleryImages = async (cloudinaryDir: string) => {
  return (await cloudinary.v2.search
    .expression(`folder="${cloudinaryDir}/*"`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(30)
    .execute()) as { resources: SearchResult[] };
};