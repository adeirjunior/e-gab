import prisma from "@/lib/configs/prisma"
import websites from "./seed-data/website"
import users from "./seed-data/user"
import socialMediaItems from "./seed-data/socialMedia"
import proposals from "./seed-data/proposal"
import posts from "./seed-data/post"
import politicians from "./seed-data/politician"
import messages from "./seed-data/message"
import laws from "./seed-data/law"
import contacts from "./seed-data/contact"
import clients from "./seed-data/client"
import chatRooms from "./seed-data/chatRoom"
import chatRoomFiles from "./seed-data/chatRoomFile"

async function main() {
    await prisma.website.createMany({
        data: websites,
    })
    await prisma.user.createMany({
        data: users
    })
    await prisma.socialMedia.createMany({
        data: socialMediaItems
    })
    await prisma.proposal.createMany({
      data: proposals
    });
    await prisma.post.createMany({
      data: posts
    });
    await prisma.politician.createMany({
      data: politicians as any
    });
    await prisma.message.createMany({
      data: messages
    });
    await prisma.law.createMany({
      data: laws,
    });
    await prisma.contact.createMany({
      data: contacts,
    });
    await prisma.client.createMany({
      data: clients,
    });
    await prisma.chatRoom.createMany({
      data: chatRooms,
    });
    await prisma.chatRoomFile.createMany({
      data: chatRoomFiles,
    });
}

main().then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })