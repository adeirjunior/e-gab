"use client";

import { DonutChart } from "@tremor/react";

const datahero = [
  {
    name: "Elogios",
    value: 12,
  },
  {
    name: "Reclamações",
    value: 45,
  },
  {
    name: "Avisos",
    value: 38,
  },
];

const onChange = (v: any) => {
  console.log(v);
};

export default function Pie() {
  return <DonutChart data={datahero} variant="pie" onValueChange={onChange} />;
}
