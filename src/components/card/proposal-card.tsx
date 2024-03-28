"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { Proposal, ProposalTypes } from "@prisma/client";

const proposalTypeTranslate = (type: ProposalTypes) => {
  switch (type) {
    case "education":
      return "Educação";
    case "health":
      return "Saúde";
    case "security":
      return "Segurança";
    case "infrastructure":
      return "Infraestrutura";
    default:
      return "Erro";
  }
};

export default function ProposalCard({ data }: { data: Proposal[] }) {
  return (
    <Accordion variant="bordered" selectionMode="multiple">
      {data &&
        data.map((item, index) => (
          <AccordionItem
            key={index}
            aria-label="Chung Miller"
            className="text-gray-400"
            title={proposalTypeTranslate(item.type)}
          >
            {item.description}
          </AccordionItem>
        ))}
    </Accordion>
  );
}
