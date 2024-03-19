import SectionHeadingTitles from "./section-heading-titles";
import prisma from "@/lib/configs/prisma";

export default async function StatsGrid({ websiteId }: { websiteId: string }) {
  const lawCount = await prisma.law.count({
    where: {
      websiteId,
    },
  });

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <SectionHeadingTitles
          id="resumo"
          title="Um resumo de todo meu trabalho"
          subtitle="Veja"
          description=""
        />

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-100">
            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Leis aprovadas
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                {lawCount}
              </dd>
            </div>

            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Indicações legislativas
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                24
              </dd>
            </div>

            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Moções
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                86
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
