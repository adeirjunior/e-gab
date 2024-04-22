import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import prisma from "@/lib/configs/prisma";
import LawCard from "../card/law-card";
import Image from "next/image";
import MotionCard from "../card/motion-card";

export type contentArray = {
  websiteId: string;
  limit?: number;
};

export default async function Motions({ websiteId, limit }: contentArray) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const motions = await prisma.politicianMotion.findMany({
    where: {
      websiteId
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      website: true,
    },
    ...(limit ? { take: limit } : {}),
  });

  return motions.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-1">
      {motions.map((motion) => (
        <MotionCard key={motion.id} data={motion} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">Sem moções ainda</h1>
      <Image
        alt="missing law"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        Você não tem nenhuma moção ainda. Crie uma para começar.
      </p>
    </div>
  );
}
