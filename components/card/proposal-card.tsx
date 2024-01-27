"use client";

import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { Proposal, ProposalTypes } from "@prisma/client";

export default function ProposalCard({ data }: { data: Proposal[] }) {
  const ProposalTypeTranslate = (type: ProposalTypes) => {
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

  return (
    <Accordion variant="bordered" selectionMode="multiple">
      {data && data.map((item, index) => (
        <AccordionItem
          key={index}
          aria-label="Chung Miller"
          className="text-gray-400"
          title={ProposalTypeTranslate(item.type)}
        >
          {item.description}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
