export type PricingTableType = {
  name: string;
  monthPrice: string;
  yearPrice: string;
  description: string;
  items: PricingTableItemType[];
}[];

type PricingTableItemType = {
  name: string;
};

export const pricingTable: PricingTableType = [
  {
    name: "Padrão",
    monthPrice: "150",
    yearPrice: "1500",
    description: "Quer dar inicio?",
    items: [
      {
        name: "5 usuários",
      },
      {
        name: "Atualizações gratuitas",
      },
      {
        name: "3 meses de suporte",
      },
    ],
  },
  {
    name: "Profissional",
    monthPrice: "200",
    yearPrice: "2000",
    description: "Desbloqueie Todo o Potencial!",
    items: [
      {
        name: "Usuários ilimitados",
      },
      {
        name: "Atualizações gratuitas",
      },
      {
        name: "Suporte 24/7",
      },
    ],
  },
];
