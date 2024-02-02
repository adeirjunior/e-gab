"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { SocialMedia } from "@prisma/client";

export default function SocialMediaCard({ data }: { data: SocialMedia[] }) {
  
  return (
    <Accordion variant="bordered" selectionMode="multiple">
      {data && data.map((item, index) => (
        <AccordionItem
          key={index}
          aria-label="Chung Miller"
          className="text-gray-400"
          title={item.type}
        >
          {item.link || item.handle}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
