import prisma from "@/lib/configs/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;

  const data = await prisma.admin.findUnique({
    where: {
        id
    },
    include: {
        user: true
    }
  })

   if (!data) {
     notFound();
   }

  return (
<div>{data.user.email}</div>
  )}

  export default page