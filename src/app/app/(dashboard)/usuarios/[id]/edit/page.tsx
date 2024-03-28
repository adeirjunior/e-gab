import prisma from "@/lib/configs/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function page({ params }: PageProps) {
    const { id } = params;

    const data = await prisma.admin.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!data) {
      notFound();
    }

  return <div>Editar</div>;
}