import EmBreveAlert from "@/components/em-breve";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda",
};

export default function page() {
  return (
    <section>
      <EmBreveAlert />
    </section>
  );
}

