import {
  ChatRoom,
} from "@prisma/client";

const chatRooms: ChatRoom[] = [
  {
    id: "1",
    title: "Chat Room 1",
    description: "Chat Room Description 1",
    address: "123 Main St, City, Country",
    cep: "12345-678",
    tel: "+1234567890",
    stars: 4,
    startingFiles: ["file1.pdf", "file2.jpg"],
    clientId: "1",
    secretaryId: "1",
    politicianId: "1",
    websiteId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'pending',
  },
  {
    id: "2",
    title: "Chat Room 2",
    description: "Chat Room Description 2",
    address: "456 Broad St, Town, Country",
    cep: "98765-432",
    tel: "+9876543210",
    stars: 5,
    startingFiles: ["file3.txt", "file4.png"],
    clientId: "2",
    secretaryId: "2",
    politicianId: "2",
    websiteId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'active',
  },
];

export default chatRooms;
