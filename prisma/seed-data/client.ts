import { Client } from "@prisma/client";

const clients: Client[] = [
  {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    cpf: "123.456.789-01",
    tel: "+1234567890",
    address: "123 Main St, City, Country",
  },
  {
    id: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
    cpf: "987.654.321-01",
    tel: "+9876543210",
    address: "456 Broad St, Town, Country",
  },
];

export default clients;
