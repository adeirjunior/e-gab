import React from 'react'
import { contentArray } from './posts';
import { getSession } from '@/lib/auth/get-session';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { Button, Image } from '@nextui-org/react';

export default async function Laws({siteId, limit}: contentArray) {

    const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  const laws = await prisma.law.findMany({
    where: {
      websiteId: siteId,
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {laws.map((law) => (
        <Button key={law.id}>{law.title}</Button>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">Sem Leis Ainda</h1>
      <Image
        alt="missing law"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        Você não tem nenhuma lei ainda. Crie uma para começar.
      </p>
    </div>
  );
}
