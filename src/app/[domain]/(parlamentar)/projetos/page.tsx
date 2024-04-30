import EmBreveAlert from "@/components/em-breve";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos",
};

export default function page() {
  return <section className="min-h-screen space-y-6"><EmBreveAlert/></section>;
}
