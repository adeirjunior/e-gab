import { SocialMedia } from "@prisma/client";

const socialMediaItems: SocialMedia[] = [
  {
    id: "1",
    type: "facebook",
    handle: "user1_facebook",
    link: "https://www.facebook.com/user1",
    websiteId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    type: "twitter",
    handle: "user1_twitter",
    link: "https://twitter.com/user1",
    websiteId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    type: "instagram",
    handle: "user1_instagram",
    link: "https://www.instagram.com/user1",
    websiteId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default socialMediaItems;
