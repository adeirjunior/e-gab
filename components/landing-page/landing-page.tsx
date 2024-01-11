import Link from "next/link";
import Background1 from "./background1";
import Background2 from "./background2";

export default function LandingPage() {
  return (
    <>
      <div className="container relative mx-auto flex flex-col-reverse px-6 sm:flex-row sm:px-12">
        <div className="relative z-10 sm:w-6/12">
          <Background1 />
        </div>
        <div className="relative z-10 mb-16 ml-auto mt-8 flex flex-col items-start sm:mb-0 sm:mt-0 sm:w-5/12 sm:items-end sm:text-right xl:w-4/12 xl:pt-20">
          <h1 className="mb-4 text-4xl font-black leading-none text-blue-900 lg:text-5xl">
            Plataforma para aumentar votos.
          </h1>
          <p className="mb-4 text-blue-900 sm:mb-12 lg:text-lg">
            Eleve sua campanha a um novo patamar com uma plataforma
            personalizada que cativa eleitores e fortalece sua imagem política.
          </p>
          <Link
            href={`${
              process.env.NEXTAUTH_URL
                ? "http://app.localhost:3000"
                : `https://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
            }`}
            className="rounded-full bg-purple-600 px-12 py-3 text-lg font-semibold text-white hover:bg-blue-400"
          >
            Entrar
          </Link>
        </div>
        <Background2 />
      </div>
    </>
  );
}
