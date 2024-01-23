import styles from "./mdx.module.css";
import { Key } from "react";

export default function MDX({ source }: { source: string[] }) {
  return (
    <article
      className={`prose-md  prose prose-stone m-auto w-11/12 text-wrap py-6 sm:prose-lg sm:w-3/4 ${styles.root}`}
      suppressHydrationWarning={true}
    >
      {source.map((item: string, index: Key) => {
        if (typeof item === "string") {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          );
        }
        return item;
      })}
    </article>
  );
}
