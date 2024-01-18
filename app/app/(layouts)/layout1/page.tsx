import HeaderLayout1 from "@/components/header/HeaderLayout1";
import MagicButton from "@/components/button/MagicButton";
import { Card } from "@nextui-org/react";

export default function App() {
  return (
    <div className="bg-black ">
      <HeaderLayout1 />
      <section className="shadow-landingPageInner bg-portrait -z-40 flex h-screen w-full flex-col items-center justify-end bg-cover bg-center bg-no-repeat p-6 sm:bg-contain sm:bg-left lg:flex-row">
        <div>
          <h1 className="mb-4 hidden text-5xl font-bold uppercase text-white lg:block">
            Trabalhando todo dia.
            <br />
            Sem parar.
          </h1>
          <MagicButton />
        </div>
      </section>
      <section className="m-auto grid w-fit grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="grid h-60  w-60 place-content-center border border-gray-600 text-center">
          <p className="text-6xl font-bold text-white">184</p>
          <p className="text-2xl font-bold text-white">Projetos de lei</p>
        </Card>
        <Card className="grid h-60  w-60 place-content-center border border-gray-600 text-center">
          <p className="text-6xl font-bold text-white">123</p>
          <p className="text-2xl font-bold text-white">Leis aprovadas</p>
        </Card>
        <Card className="grid h-60  w-60 place-content-center border border-gray-600 text-center">
          <p className="text-6xl font-bold text-white">184</p>
          <p className="text-2xl font-bold text-white">
            Indicações legislativas
          </p>
        </Card>
        <Card className="grid h-60  w-60 place-content-center border border-gray-600 text-center">
          <p className="text-6xl font-bold text-white">184</p>
          <p className="text-2xl font-bold text-white">Moções</p>
        </Card>
      </section>
    </div>
  );
}
