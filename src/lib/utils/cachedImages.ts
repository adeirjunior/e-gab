import cloudinary from "@/lib/configs/cloudinary";

let cachedResults: any;

export default async function getResults(dir: string) {
  if (!cachedResults) {
    const fetchedResults = await cloudinary.v2.search
      .expression(`folder:"${dir}"`)
      .sort_by("public_id", "desc")
      .max_results(400)
      .execute();

    cachedResults = fetchedResults;
  }

  return cachedResults;
}
