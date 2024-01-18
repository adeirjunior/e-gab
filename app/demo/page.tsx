import CldImage from "@/components/demo/cloudinary-image";
import ObjectiveSection from "@/components/demo/objective-section";
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
          <ObjectiveSection type="saude" title="Saúde">
            Implementarei programas educativos e preventivos para conscientizar
            a população sobre práticas saudáveis, visando reduzir a incidência
            de doenças e promover um estilo de vida mais saudável, visando
            reduzir a incidência de doenças e promover um estilo de vida mais
            saudável.
          </ObjectiveSection>
          <ObjectiveSection type="educacao" title="Educação">
            Promoverei a integração de tecnologias educacionais, visando
            enriquecer o processo de aprendizado e preparar os alunos para os
            desafios da era digital.
          </ObjectiveSection>
          <ObjectiveSection type="infraestrutura" title="Infraestrutura">
            Buscar investimentos para melhorar os serviços de saneamento básico,
            assegurando o acesso universal a água potável e a gestão eficiente
            de resíduos
          </ObjectiveSection>
        </section>
        <section>
          <SectionHeadingTitles
            subtitle="Eventos próximos"
            title="Fique atento aos próximos eventos"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. In unde
        expedita veniam quibusdam sed cupiditate nostrum, deleniti perspiciatis
        architecto fugit. Rem consequuntur error placeat dolor tenetur, incidunt
        nisi fugit non mollitia molestiae quisquam ad hic corporis architecto
        possimus quae optio cupiditate sit! Maiores dignissimos ea culpa omnis
        odio. Numquam, laboriosam."
          />
        </section>
      </div>
    </>
  );
}
