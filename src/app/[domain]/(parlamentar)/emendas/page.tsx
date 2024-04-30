import EmBreveAlert from "@/components/em-breve";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bibliografia",
};

export default function page() {
  return (
    <section className="h-full w-full">
      <EmBreveAlert/>
    </section>
  );
}
