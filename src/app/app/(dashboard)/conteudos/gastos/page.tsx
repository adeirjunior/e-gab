import EmBreveAlert from "@/components/em-breve";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gastos",
};

export default function page() {
  return (
    <div>
      <EmBreveAlert />
    </div>
  );
}
