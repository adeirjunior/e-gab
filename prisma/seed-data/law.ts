import { Law } from "@prisma/client";

const laws: Law[] = [
  {
    id: "1",
    title: "Law 1",
    content: "Law Content 1",
    image: "law-1-image",
    imageBlurhash: "law-1-blurhash",
    published: true,
    slug: "law-1",
    description: "Law Description 1",
    createdAt: new Date(),
    updatedAt: new Date(),
    websiteId: "1",
  },
  {
    id: "2",
    title: "Law 2",
    content: "Law Content 2",
    image: "law-2-image",
    imageBlurhash: "law-2-blurhash",
    published: true,
    slug: "law-2",
    description: "Law Description 2",
    createdAt: new Date(),
    updatedAt: new Date(),
    websiteId: "1",
  },
  {
    id: "3",
    title: "Law 3",
    content: "Law Content 3",
    image: "law-3-image",
    imageBlurhash: "law-3-blurhash",
    published: true,
    slug: "law-3",
    description: "Law Description 3",
    createdAt: new Date(),
    updatedAt: new Date(),
    websiteId: "2",
  },
];

export default laws;
