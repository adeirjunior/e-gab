// a bunch of loading divs

import PlaceholderCard from "@/components/placeholder-card";

export default function Loading() {
  return (
    <>
      <div className="h-10 w-48 animate-pulse rounded-md bg-stone-100 dark:bg-stone-800" />
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-stone-800 animate-pulse w-full h-20 rounded-xl"> </div>
        ))}
      </div>
    </>
  );
}
