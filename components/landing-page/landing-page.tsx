import Link from "next/link";
import Background1 from "./background1";
import Background2 from "./background2";

export default function LandingPage() {
  return (
    <main className="font-montserrat bg-gray-100">
      <header className="flex h-24 items-center sm:h-32">
        <div className="container mx-auto flex items-center justify-between px-6 sm:px-12">
          <div className="flex items-start text-2xl font-black text-blue-900">
            E-Gab
            <span className="ml-2 h-3 w-3 rounded-full bg-purple-600"></span>
          </div>
          <div className="flex items-center">
            <nav className="hidden items-center text-lg text-purple-900 lg:flex">
              <Link href="#" className="flex px-8 py-2 hover:text-purple-700">
                Home
              </Link>
              <Link href="#" className="flex px-8 py-2 hover:text-purple-700">
                Sobre
              </Link>
              <Link href="#" className="flex px-8 py-2 hover:text-purple-700">
                Preços
              </Link>
              <Link href="#" className="flex px-8 py-2 hover:text-purple-700">
                Contato
              </Link>
            </nav>
            <button className="ml-4 flex flex-col">
              <span className="mb-1 h-1 w-6 rounded-full bg-purple-800"></span>
              <span className="mb-1 h-1 w-6 rounded-full bg-purple-800"></span>
              <span className="mb-1 h-1 w-6 rounded-full bg-purple-800"></span>
            </button>
          </div>
        </div>
      </header>
      <div className="container relative mx-auto flex flex-col-reverse px-6 sm:flex-row sm:px-12">
        <div className="relative z-10 sm:w-6/12">
          <Background1 />
        </div>
        <div className="relative z-10 mb-16 ml-auto mt-8 flex flex-col items-start sm:mb-0 sm:mt-0 sm:w-5/12 sm:items-end sm:text-right xl:w-4/12 xl:pt-20">
          <h1 className="mb-4 text-4xl font-black leading-none text-blue-900 lg:text-5xl">
            Plataforma para aumentar votos.
          </h1>
          <p className="mb-4 text-blue-900 sm:mb-12 lg:text-lg">
            Uma plataforma para candidatos, vereadores e prefeitos aumentarem
            sua campanha e votos.
          </p>
          <Link
            href={`${process.env.NEXTAUTH_URL ? "http://app.localhost:3000" : "https://app.anticara.com"}`}
            className="rounded-full bg-purple-600 px-12 py-3 text-lg font-semibold text-white hover:bg-blue-400"
          >
            Entrar
          </Link>
        </div>
        <Background2 />
      </div>
    </main>
  );
}
