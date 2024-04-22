"use client";

import { random } from "@/lib/utils";
import { Card, Metric, Text, AreaChart, BadgeDelta, Flex } from "@tremor/react";
import { useMemo } from "react";
import Example from "./chart-composition";
import AnalyticsMockup from "./analytics";

export default function OverviewStats() {
  const data = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return [
      ...months.map((month) => ({
        Month: `${month} 23`,
        "Total de Visitantes": random(20000, 170418),
      })),
      {
        Month: "Jul 23",
        "Total de Visitantes": 170418,
      },
    ];
  }, []);

  return (
    <div className="grid gap-6">
      <div className="gap-6 sm:grid-cols-3">
        <AnalyticsMockup />
      </div>
      <Card className="dark:!bg-stone-900">
        <Text>Total de Visitantes</Text>
        <Flex
          className="space-x-3 truncate"
          justifyContent="start"
          alignItems="baseline"
        >
          <Metric className="font-cal">197</Metric>
          <BadgeDelta
            deltaType="moderateIncrease"
            className="dark:bg-green-900 dark:bg-opacity-50 dark:text-green-400"
          >
            34.3%
          </BadgeDelta>
        </Flex>
        <AreaChart
          className="mt-6 h-28"
          data={data}
          index="Month"
          valueFormatter={(number: number) =>
            `${Intl.NumberFormat("br").format(number).toString()}`
          }
          categories={["Total de Visitantes"]}
          colors={["blue"]}
          showXAxis={true}
          showGridLines={false}
          startEndOnly={true}
          showYAxis={false}
          showLegend={false}
        />
      </Card>
      <Example />
    </div>
  );
}
