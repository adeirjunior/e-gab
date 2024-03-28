import CldImage from "@/components/demo/cloudinary-image";
import prisma from "@/lib/configs/prisma";
import { Bold } from "@tremor/react";
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
      id,
    },
    include: {
      user: true,
    },
  });

  if (!data) {
    notFound();
  }

  return (
    <div>
      <div className="gap-4 flex flex-col items-center justify-center">
        <CldImage
          className="rounded-full"
          alt={`Imagem do usuário ${data.user.name}`}
          width={64}
          height={64}
          src={data.user.image}
        />
        <div>
          <Bold className="text-lg">{data.user.name}</Bold>
          <p className="text-tiny">{data.user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default page;
