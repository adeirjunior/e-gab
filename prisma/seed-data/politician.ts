import { Politician } from "@prisma/client";

const politicians: Politician[] = [
  {
    id: "1",
    party: "Party 1",
    userId: "1",
    description: "Politician Description 1",
    createdAt: new Date(),
    updatedAt: new Date(),
    billingAddress: "",
    paymentMethod: "",
  },
  {
    id: "2",
    party: "Party 2",
    userId: "2",
    description: "Politician Description 2",
    createdAt: new Date(),
    updatedAt: new Date(),
    billingAddress: "",
    paymentMethod: "",
  },
  {
    id: "3",
    party: "Party 3",
    userId: "1",
    description: "Politician Description 3",
    createdAt: new Date(),
    updatedAt: new Date(),
    billingAddress: "",
    paymentMethod: "",
  },
];

export default politicians;
