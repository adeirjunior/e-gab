import CldImage from "@/components/demo/cloudinary-image";
import { getWebsiteBySubdomain } from "@/lib/fetchers/site";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
  params,
}: {
  params: { domain: string };
}) {
      const subdomain = params.domain.endsWith(
        `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      )
        ? params.domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
        : null;


  const website = await getWebsiteBySubdomain(subdomain!);

  if (!website) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Este site não existe
        </div>
      ),
      {
        ...size,
      },
    );
  }

  return (
      <CldImage
        width={size.width}
        height={size.height}
        alt={alt}
        src={website!.image}
      />
  )   
}
