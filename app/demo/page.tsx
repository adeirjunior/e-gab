import CldImage from "@/components/demo/cloudinary-image";
import SectionHeadingTitles from "@/components/demo/section-heading-titles";
import WorkNumberCard from "@/components/demo/work-number-card";
import { Button } from "@nextui-org/react";

const workNumberCardData = [
  {
    title: "Leis Aprovadas",
    number: 32,
  },
  {
    title: "Projetos de lei",
    number: 200,
  },
  {
    title: "Indicações legislativas",
    number: 164,
  },
  {
    title: "Moções",
    number: 50,
  },
];

export default function Page() {
  return (
    <>
      <main className="relative flex min-h-[280px] w-full flex-col items-center justify-end bg-[#90CAFF]">
        <div className="absolute bottom-0 left-0 h-[140px] w-full bg-gradient-to-t from-heroGradient"></div>
        <CldImage
          width={200}
          height={200}
          alt="Vereador Claudinho da Cascalheira"
          src="E-Gab/Demo/t508ukdln5gw6cquveu4"
          className=""
        />
        <Button
          color="primary"
          radius="full"
          className="absolute bottom-0 -mb-5 text-xs"
        >
          Junte-se
        </Button>
      </main>
      <div className="container space-y-10 py-10">
        <section>
          <SectionHeadingTitles
            subtitle="Veja"
            title="Um resumo de todo meu trabalho"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. In unde
        expedita veniam quibusdam sed cupiditate nostrum, deleniti perspiciatis
        architecto fugit. Rem consequuntur error placeat dolor tenetur, incidunt
        nisi fugit non mollitia molestiae quisquam ad hic corporis architecto
        possimus quae optio cupiditate sit! Maiores dignissimos ea culpa omnis
        odio. Numquam, laboriosam."
          />
          <div className="mx-auto grid w-fit grid-cols-2 place-content-center gap-6 sm:grid-cols-4">
            {workNumberCardData.map((item, index) => (
              <WorkNumberCard key={index} data={item} />
            ))}
          </div>
        </section>
        <section>
          <SectionHeadingTitles
            subtitle="Meus objetivos"
            title="Quais são as principais areas que quero impulsionar"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. In unde
        expedita veniam quibusdam sed cupiditate nostrum, deleniti perspiciatis
        architecto fugit. Rem consequuntur error placeat dolor tenetur, incidunt
        nisi fugit non mollitia molestiae quisquam ad hic corporis architecto
        possimus quae optio cupiditate sit! Maiores dignissimos ea culpa omnis
        odio. Numquam, laboriosam."
          />
          <div className="mx-auto grid w-fit grid-cols-2 place-content-center gap-6">
            {workNumberCardData.map((item, index) => (
              <WorkNumberCard key={index} data={item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
