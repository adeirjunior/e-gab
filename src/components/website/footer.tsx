"use client";

import { Link } from "@nextui-org/react";
import { SocialMedia, Website } from "@prisma/client";
import { Instagram, Youtube } from "lucide-react";
import Facebook from "./svg/facebook.svg";
import Tiktok from "./svg/tiktok.svg";
import Twitter from "./svg/twitter.svg";
import { CldImage } from "next-cloudinary";

export default function Footer({
  data,
  socials,
}: {
  data: Website;
  socials: SocialMedia[];
}) {
  return (
    <footer className="mt-10 bg-primary-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <Link className="block text-teal-600" href="/">
            <span className="sr-only">Home</span>
            <CldImage
              alt={`logo de ${data.name}`}
              src={data.logo}
              width={50}
              height={50}
            />
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
          {data.description}
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/contato"
            >
              {" "}
              Contato{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/bibliografia"
            >
              {" "}
              Bibliografia{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/posts"
            >
              {" "}
              Posts{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/agenda"
            >
              {" "}
              Agenda{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/"
            >
              {" "}
              Projects{" "}
            </a>
          </li>

          <li>
            <a
              className="text-gray-700 transition hover:text-gray-700/75"
              href="/"
            >
              {" "}
              Blog{" "}
            </a>
          </li>
        </ul>
        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          {socials.map((social) => (
            <li key={social.id}>
              <a
                href={
                  social.type === "facebook"
                    ? `https://facebook.com/${social.handle}`
                    : social.type === "twitter"
                      ? `https://x.com/${social.handle}`
                      : social.type === "instagram"
                        ? `https://instagram.com/${social.handle}`
                        : social.type === "tiktok"
                          ? `https://tiktok.com/@${social.handle}`
                          : social.type === "youtube"
                            ? `https://youtube.com/@${social.handle}`
                            : ""
                }
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75"
              >
                <span className="sr-only">{social.type}</span>
                {social.type === "facebook" ? (
                  <Facebook />
                ) : social.type === "twitter" ? (
                  <Twitter className="text-gray-500" />
                ) : social.type === "instagram" ? (
                  <Instagram />
                ) : social.type === "tiktok" ? (
                  <Tiktok />
                ) : social.type === "youtube" ? (
                  <Youtube />
                ) : (
                  ""
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
