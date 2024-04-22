// Assuming BlogCardProps looks something like this:
type BlogCardProps = {
  data: {
    id: string;
    title: string | null;
    description: string | null;
    content: string | null;
    slug: string;
    image: string | null;
    imageBlurhash: string | null;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    userId: string;
    websiteId: string;
  };
};

import BlogCard from "@/components/card/blog-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
};

const posts: BlogCardProps[] = [
  {
    data: {
      slug: "post-exemplo",
      image: "",
      imageBlurhash: "example-blurhash",
      title: "Example Title",
      description: "Example Description",
      createdAt: new Date("2024-01-18T12:00:00"),
      published: true,
      updatedAt: new Date("2024-01-18T12:00:00"),
      websiteId: "",
      id: "",
      userId: "",
      content: "",
    },
  },
];

export default function Page() {
  return (
    <div>
      <BlogCard data={posts[0].data} />
    </div>
  );
}
