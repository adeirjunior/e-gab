import PricingTable from "@/components/table/pricing-table";
import PricingTableDiferences from "@/components/table/pricing-table-diferences";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preços",
};

export default function page() {
  return (
    <>
      <main
        className="
   relative
   z-20
   flex
   justify-center
   overflow-hidden
   "
      >
        <PricingTable />
      </main>
      <PricingTableDiferences />
    </>
  );
}
