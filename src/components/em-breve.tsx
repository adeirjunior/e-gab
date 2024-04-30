import Bg from "./website/svg/bg.svg";
import EmBreve from "./website/svg/em-breve.svg";

export default function EmBreveAlert() {
  return (
    <div className="relative h-full w-full min-h-screen">
        <Bg className="absolute top-0 left-0" />
        <EmBreve className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>
        <Bg className="absolute bottom-0 right-0 float-right"/>
      </div>
  );
}