import HeaderLayout1 from "@/app/_ui/components/header/HeaderLayout1";
import MagicButton from "@/app/_ui/components/button/MagicButton";
import { Card } from "@nextui-org/react";

export default function App() {
  return (
    <div className="bg-black ">
      <HeaderLayout1 />
      <section className="w-full items-center shadow-landingPageInner flex flex-col justify-end h-screen -z-40 bg-portrait bg-cover sm:bg-contain sm:bg-left lg:flex-row bg-center bg-no-repeat p-6">
        <div>
          <h1 className="hidden lg:block text-white font-bold uppercase text-5xl">Trabalhando todo dia.<br/>Sem parar.</h1>
          <MagicButton />
        </div>
      </section>
      <section className="grid w-fit grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-auto py-6">
        <Card className="w-60 h-60  text-center grid place-content-center border border-gray-600">
          <p className="text-6xl font-bold text-white">184</p>
          <p className="text-2xl font-bold text-white">Projetos de lei</p>
        </Card>
        <Card className="w-60 h-60  text-center grid place-content-center border border-gray-600">
          <p className="text-6xl font-bold text-white">123</p>
          <p className="text-2xl font-bold text-white">Leis aprovadas</p>
        </Card>
        <Card className="w-60 h-60  text-center grid place-content-center border border-gray-600">
          <p className="text-6xl font-bold text-white">184</p>
          <p className="text-2xl font-bold text-white">Indicações legislativas</p>
        </Card>
        <Card className="w-60 h-60  text-center grid place-content-center border border-gray-600">
          <p className="text-6xl font-bold text-white">184</p>
          <p className="text-2xl font-bold text-white">Moções</p>
        </Card>
      </section>
    </div>
  );
}
