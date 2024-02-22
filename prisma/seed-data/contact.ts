import { Contact } from "@prisma/client";

const contacts: Contact[] = [
  {
    id: "1",
    phone: "123-456-7890",
    email: "contact1@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    phone: "987-654-3210",
    email: "contact2@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default contacts;
