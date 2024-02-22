import { Post } from "@prisma/client";

const posts: Post[] = [
  {
    id: "1",
    title: "Post 1",
    description: "Description 1",
    content: "Content 1",
    slug: "post-1",
    image: "post-1-image",
    imageBlurhash: "post-1-blurhash",
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
    userId: "1",
    websiteId: "1",
  },
  {
    id: "2",
    title: "Post 2",
    description: "Description 2",
    content: "Content 2",
    slug: "post-2",
    image: "post-2-image",
    imageBlurhash: "post-2-blurhash",
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
    userId: "2",
    websiteId: "1",
  },
  {
    id: "3",
    title: "Post 3",
    description: "Description 3",
    content: "Content 3",
    slug: "post-3",
    image: "post-3-image",
    imageBlurhash: "post-3-blurhash",
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
    userId: "1",
    websiteId: "2",
  },
];

export default posts;
