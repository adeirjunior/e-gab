import { Message } from "@prisma/client";

const messages: Message[] = [
  {
    id: "1",
    text: "Hello, this is message 1",
    file: "file1.txt",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "1",
    chatRoomId: "1",
  },
  {
    id: "1",
    text: "Hello, this is message 1",
    file: "file2.txt",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "1",
    chatRoomId: "1",
  },
  {
    id: "3",
    text: "Message 3 reporting in",
    file: "file3.png",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "1",
    chatRoomId: "2",
  },
];

export default messages;
