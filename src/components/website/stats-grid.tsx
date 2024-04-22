import { Card, Link } from "@nextui-org/react";
import SectionHeadingTitles from "./section-heading-titles";
import prisma from "@/lib/configs/prisma";

export default async function StatsGrid({ websiteId }: { websiteId: string }) {
  const lawCount = await prisma.law.count({
    where: {
      websiteId,
      published: true,
    },
  });

  const motionCount = await prisma.politicianMotion.count({
    where: {
      websiteId,
      published: true
    },
  });

const legislativeIndication = await prisma.legislativeIndication.count({
  where: {
    websiteId,
    published: true,
  },
});

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <SectionHeadingTitles
          id="resumo"
          title="Um resumo de todo meu trabalho"
          subtitle="Veja"
          description=""
        />

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-100">
            <Card
              as={Link}
              href="/leis"
              isPressable
              className="flex flex-col items-center px-4 py-8 text-center"
            >
              <dt className="order-last text-lg font-medium text-gray-500">
                Leis aprovadas
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {lawCount}
              </dd>
            </Card>

            <Card
              as={Link}
              href="/indicacoes-legislativas"
              isPressable
              className="flex flex-col items-center px-4 py-8 text-center"
            >
              <dt className="order-last text-lg font-medium text-gray-500">
                Indicações legislativas
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {legislativeIndication}
              </dd>
            </Card>

            <Card
              as={Link}
              href="/mocoes"
              isPressable
              className="flex flex-col items-center px-4 py-8 text-center"
            >
              <dt className="order-last text-lg font-medium text-gray-500">
                Moções
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {motionCount}
              </dd>
            </Card>
          </dl>
        </div>
      </div>
    </section>
  );
}
