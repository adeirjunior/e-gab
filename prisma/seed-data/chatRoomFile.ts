import { ChatRoomFile } from "@prisma/client";

const chatRoomFiles: ChatRoomFile[] = [
  {
    id: "1",
    file: "file1.pdf",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    file: "file2.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    file: "file3.txt",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default chatRoomFiles;
