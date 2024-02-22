import { Proposal } from "@prisma/client";

const proposals: Proposal[] = [
  {
    id: "1",
    type: "health",
    description: "Health Proposal Description 1",
    websiteId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    type: "security",
    description: "Security Proposal Description 2",
    websiteId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    type: "infrastructure",
    description: "Infrastructure Proposal Description 3",
    websiteId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default proposals;
