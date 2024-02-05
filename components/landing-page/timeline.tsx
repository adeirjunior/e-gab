import Icon1 from "./icons/icon-1";
import Icon2 from "./icons/icon-2";
import TimelineBlockLeft from "./timeline-block-left";
import TimelineBlockRight from "./timeline-block-right"

export default function Timeline() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-white py-6 sm:py-12">
      <div className="w-full px-2 py-3 sm:mx-auto sm:max-w-xl sm:px-0">
        <div className="relative text-sm font-semibold text-gray-700 antialiased">
          <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 transform bg-blue-300 sm:block"></div>

          <TimelineBlockLeft text="Crie a sua conta como um político." Icon={Icon2} />

          <TimelineBlockRight text="Faça as configurações inicias." Icon={Icon1} />

          <TimelineBlockLeft text="Convide outros usuários para administrarem o conteúdo do seu site." Icon={Icon2} />

          <TimelineBlockRight text="Nunca mais fique desconectado do seu eleitorado!" Icon={Icon1} />

        </div>
      </div>
    </div>
  );
}