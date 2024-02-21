import { create } from "@/lib/actions/image/image.create.action";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new Response(
      "Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.",
      {
        status: 401,
      },
    );
  }

  const file = String(req.body) || "";

  // Create FormData and append the file data
  const formData = new FormData();
  formData.append("image", file);

  const image = await create(formData, "image");

  return NextResponse.json(image);
}
