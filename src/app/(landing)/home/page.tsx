import LandingPage from "@/components/landing-page/landing-page";
import { Image } from "@nextui-org/react";
import { Metadata } from "next";
import Timeline from "../../../components/landing-page/timeline";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <LandingPage />

      <section className="bg-blueGray-50  relative bg-white">
        <div className="min-h-screen-75 relative flex content-center items-center justify-center pb-32 pt-16">
          <div className="absolute top-0 h-full w-full bg-cover bg-center">
            <span
              id="blackOverlay"
              className="absolute h-full w-full bg-[#f3f4f6]"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center lg:w-6/12">
                <div className="pr-12">
                  <h1 className="text-5xl font-semibold">
                    Conecte-se com o eleitorado.
                  </h1>
                  <p className="text-blueGray-200 mt-4 text-lg">
                    Comunique-se diretamente com eleitores, compartilhando sua
                    história, propostas e projetos de uma forma autêntica e
                    envolvente.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="h-70-px pointer-events-none absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        <section className="-mt-24 bg-white pb-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="w-full px-4 pt-6 text-center md:w-4/12 lg:pt-12">
                <div className="relative mb-8 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-400 p-3 text-center text-white shadow-lg">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Aumente a Visibilidade
                    </h6>
                    <p className="text-blueGray-500 mb-4 mt-2">
                      Esteja na mente dos eleitores o tempo todo, mostrando seu
                      comprometimento e transparência.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 text-center md:w-4/12">
                <div className="relative mb-8 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="bg-lightBlue-400 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full p-3 text-center text-white shadow-lg">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Fortaleça a Confiança
                    </h6>
                    <p className="text-blueGray-500 mb-4 mt-2">
                      Construa confiança e credibilidade ao fornecer informações
                      claras e acessíveis sobre suas propostas e ações.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 pt-6 text-center md:w-4/12">
                <div className="relative mb-8 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 p-3 text-center text-white shadow-lg">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Resultados Comprovados
                    </h6>
                    <p className="text-blueGray-500 mb-4 mt-2">
                      Políticos que utilizam nossa plataforma veem um aumento
                      médio de X% na preferência dos eleitores e uma maior
                      participação em eventos e encontros.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <Timeline />

      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col space-y-12 px-8 xl:px-12">
          <div className="relative">
            <h2 className="w-full text-center text-3xl font-bold sm:text-4xl md:text-5xl">
              Controle sua Presença Política com uma Dashboard Poderosa e
              Intuitiva!
            </h2>
            <p className="intro mx-auto -mt-2 w-full py-8 text-center text-lg text-gray-700 sm:max-w-3xl">
              Maximize sua influência e conecte-se com eleitores de maneira
              eficaz através de uma dashboard feita sob medida para políticos
              modernos.
            </p>
          </div>
          <div className="animated fadeIn mb-8 flex flex-col sm:flex-row">
            <div className="mb-8 flex items-center sm:order-last sm:w-1/2 md:w-5/12">
              <Image
                className="rounded-lg shadow-xl"
                src="https://cdn.devdojo.com/images/december2020/dashboard-011.png"
                alt=""
                width={1600}
                height={900}
                loading="lazy"
              />
            </div>
            <div className="mb-8 mt-5 flex flex-col justify-center sm:w-1/2 sm:pr-16 md:mt-0 md:w-7/12">
              <p className="mb-2 text-left text-sm font-semibold uppercase leading-none text-indigo-600">
                Equipe Sintonizada
              </p>
              <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">
                Gestão de Equipe Eficiente
              </h3>
              <p className="text mt-5 text-lg text-gray-700 md:text-left">
                Atribua permissões, gerencie colaboradores, e mantenha sua
                equipe alinhada na missão de fortalecer sua presença política.
              </p>
            </div>
          </div>
          <div className="animated fadeIn mb-8 flex flex-col sm:flex-row">
            <div className="mb-8 flex items-center sm:w-1/2 md:w-5/12">
              <Image
                className="rounded-lg shadow-xl"
                src="https://cdn.devdojo.com/images/december2020/dashboard-04.png"
                alt=""
                width={1600}
                height={900}
                loading="lazy"
              />
            </div>
            <div className="mb-8 mt-5 flex flex-col justify-center sm:w-1/2 sm:pl-16 md:mt-0 md:w-7/12">
              <p className="mb-2 text-left text-sm font-semibold uppercase leading-none text-indigo-600">
                Gestão de Conteúdo
              </p>
              <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">
                Atualize seu Site com Facilidade
              </h3>
              <p className="text mt-5 text-lg text-gray-700 md:text-left">
                Publique propostas, notícias, atualizações de blog e mantenha
                seu eleitorado informado com apenas alguns cliques na nossa
                dashboard intuitiva.
              </p>
            </div>
          </div>
          <div className="animated fadeIn mb-8 flex flex-col sm:flex-row">
            <div className="mb-8 flex items-center sm:order-last sm:w-1/2 md:w-5/12">
              <Image
                className="rounded-lg shadow-xl"
                src="https://cdn.devdojo.com/images/december2020/dashboard-03.png"
                alt=""
                width={1600}
                height={900}
                loading="lazy"
              />
            </div>
            <div className="mb-8 mt-5 flex flex-col justify-center sm:w-1/2 sm:pr-16 md:mt-0 md:w-7/12">
              <p className="mb-2 text-left text-sm font-semibold uppercase leading-none text-indigo-600">
                Agenda Dinâmica
              </p>
              <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">
                Agenda Personalizada
              </h3>
              <p className="text mt-5 text-lg text-gray-700 md:text-left">
                Mantenha-se organizado com uma agenda integrada, agendando
                eventos, respondendo convites e gerenciando seus compromissos
                políticos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
