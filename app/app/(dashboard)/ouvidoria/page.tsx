import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Bold, Grid } from "@tremor/react";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Estatísticas
        </h1>
      </div>
      <Grid
        className="mx-auto w-full place-content-center gap-4 sm:max-w-[900px]"
        numItems={1}
        numItemsSm={2}
        numItemsLg={3}
      >
        <Card className="w-full border border-stone-300">
          <CardHeader>Solicitações abertas</CardHeader>
          <CardBody>
            <Bold className="text-3xl">3</Bold>
          </CardBody>
        </Card>
        <Card className="w-full border border-stone-300">
          <CardHeader>Solicitações pendentes</CardHeader>
          <CardBody>
            <Bold className="text-3xl">16</Bold>
          </CardBody>
        </Card>
        <Card className="w-full border border-stone-300">
          <CardHeader>Média de qualidade</CardHeader>
          <CardBody>
            <Bold className="text-3xl">4.3</Bold>
          </CardBody>
        </Card>
      </Grid>
      <div className="flex flex-col space-y-6">
        <Bold className="font-cal text-3xl font-bold dark:text-white">
          Últimas Solicitações
        </Bold>
      </div>
    </div>
  );
}
