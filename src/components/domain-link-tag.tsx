import { getCurrentDomain } from "@/lib/utils";
import React from "react";

export default function DomainLinkTag({
  subdomain,
  path,
}: {
  subdomain?: string;
  path?: string;
}) {
  const url = getCurrentDomain(subdomain, path);
  const cleanUrl = url.replace(/^https?:\/\//, "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="m-0 truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
    >
      {cleanUrl} ↗
    </a>
  );
}
