"use client";

import { useEffect, useState } from "react";
import { Card, Title, AreaChart } from "@tremor/react";

interface VisitorData {
  date: string; // Data no formato original YYYY-MM-DD
  activeUsers: number;
}

export default function AnalyticsMockup() {
  const [chartData, setChartData] = useState<{ date: string; Visitors: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState<string | null>(null); // Estado de erro

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const response = await fetch('/api/analytics/daily-visitors');
        const data = await response.json();

        console.log("Dados retornados da API:", data);

        // Verifica se data é um array
        if (!Array.isArray(data)) {
          throw new Error("Os dados retornados não são um array.");
        }

        // Mapear os dados para o formato necessário
        const formattedData = data.map((item: VisitorData) => ({
          date: item.date,
          Visitors: item.activeUsers,
        }));

        setChartData(formattedData);
      } catch (error: any) {
        console.error("Erro ao buscar dados dos visitantes:", error);
        setError("Não foi possível carregar os dados de visitantes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorData();
  }, []);

  return (
    <div className="grid w-full gap-6">
      <Card>
        <Title>Visitantes</Title>
        {isLoading ? (
          <p className="text-center">Carregando...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : chartData.length === 0 ? (
          <p className="text-center">Sem dados</p>
        ) : (
          <AreaChart
            className="mt-4 h-72"
            data={chartData}
            index="date"
            categories={["Visitors"]}
            colors={["indigo"]}
            valueFormatter={(number: number) =>
              Intl.NumberFormat("pt-BR").format(number).toString()
            }
          />
        )}
      </Card>
    </div>
  );
}
