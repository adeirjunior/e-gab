import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import prisma from "@/lib/configs/prisma";
import LawCard from "../card/law-card";
import Image from "next/image";

export type contentArray = {
  siteId?: string;
  limit?: number;
};

export default async function Laws({ siteId, limit }: contentArray) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const laws = await prisma.law.findMany({
    where: {
      ...(siteId ? { websiteId: siteId } : {}),
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      website: true,
    },
    ...(limit ? { take: limit } : {}),
  });

  return laws.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-1">
      {laws.map((law) => (
        <LawCard key={law.id} data={law} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">Sem laws Ainda</h1>
      <Image
        alt="missing law"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        Você não tem nenhum law ainda. Crie um para começar.
      </p>
    </div>
  );
}
