import PoliticoEstatisticas from "@/components/icons/politico-estatisticas";
import { Image } from "@nextui-org/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
};

export default function page() {
  return (
    <>
      <div className="bg-white py-16">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 lg:flex lg:items-center lg:gap-12 lg:space-y-0">
            <div className="md:5/12 lg:w-5/12">
              <PoliticoEstatisticas />
            </div>
            <div className="md:7/12 lg:w-6/12">
              <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">
                Onsys Solutions: Pioneira em Soluções Digitais para Políticos
                com a Plataforma E-Gab.
              </h2>
              <p className="mt-6 text-gray-600">
                Inovando na Política: Conheça a Onsys Solutions, criadora da
                revolucionária plataforma E-Gab, transformando a presença online
                de políticos com eficiência e personalização.
              </p>
              <p className="mt-4 text-gray-600">
                Comprometidos em fornecer soluções digitais de ponta para
                políticos conscientes, estamos moldando o futuro da política
                digital no Brasil.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-blueGray-50 relative pt-16">
        <div className="container mx-auto">
          <div className="flex flex-row-reverse flex-wrap items-center">
            <div className="-mt-78 ml-auto mr-auto w-10/12 px-12 md:w-6/12 md:px-4 lg:w-4/12">
              <div className="break-wordsw-full relative mb-6 flex min-w-0 flex-col rounded-lg bg-purple-600 shadow-lg">
                <Image
                  alt="..."
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=700&amp;q=80"
                  className="w-full rounded-none align-middle"
                  width={600}
                  height={400}
                  loading="eager"
                />
                <div className="px-6 py-4">
                  <h4 className="text-xl font-bold text-white">
                    Great for your awesome project
                  </h4>
                  <p className="text-md mt-2 font-light text-white">
                    Putting together a page has never been easier than matching
                    together pre-made components. From landing pages
                    presentation to login areas, you can easily customise and
                    built your pages.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full px-4 md:w-6/12">
              <div className="flex flex-wrap">
                <div className="w-full px-4 md:w-6/12">
                  <div className="relative mt-4 flex flex-col">
                    <div className="flex-auto px-4 py-5">
                      <div className="text-blueGray-500 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                        <i className="fas fa-sitemap"></i>
                      </div>
                      <h6 className="mb-1 text-xl font-semibold">
                        CSS Components
                      </h6>
                      <p className="text-blueGray-500 mb-4">
                        Notus JS comes with a huge number of Fully Coded CSS
                        components.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex min-w-0 flex-col">
                    <div className="flex-auto px-4 py-5">
                      <div className="text-blueGray-500 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                        <i className="fas fa-drafting-compass"></i>
                      </div>
                      <h6 className="mb-1 text-xl font-semibold">
                        JavaScript Components
                      </h6>
                      <p className="text-blueGray-500 mb-4">
                        We also feature many dynamic components for React,
                        NextJS, Vue and Angular.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-6/12">
                  <div className="relative mt-4 flex min-w-0 flex-col">
                    <div className="flex-auto px-4 py-5">
                      <div className="text-blueGray-500 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                        <i className="fas fa-newspaper"></i>
                      </div>
                      <h6 className="mb-1 text-xl font-semibold">Pages</h6>
                      <p className="text-blueGray-500 mb-4">
                        This extension also comes with 3 sample pages. They are
                        fully coded so you can start working instantly.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex min-w-0 flex-col">
                    <div className="flex-auto px-4 py-5">
                      <div className="text-blueGray-500 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <h6 className="mb-1 text-xl font-semibold">
                        Documentation
                      </h6>
                      <p className="text-blueGray-500 mb-4">
                        Built by developers for developers. You will love how
                        easy is to to work with Notus JS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
