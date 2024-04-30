import EmBreveAlert from "@/components/em-breve";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventos",
};

export default function Page() {
  return (
    <div>
      <EmBreveAlert />
    </div>
  );
}
