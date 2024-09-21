import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from 'next/server';

let analyticsDataClient: BetaAnalyticsDataClient | null = null;

function getAnalyticsClient(): BetaAnalyticsDataClient {
  if (!analyticsDataClient) {
    const projectId = process.env.GOOGLE_ANALYTICS_PROJECT_ID;
    const privateKey = process.env.GOOGLE_ANALYTICS_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL;

    if (!projectId || !privateKey || !clientEmail) {
      throw new Error("Credenciais do Google Analytics estão faltando.");
    }

    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        type: "service_account",
        project_id: projectId,
        private_key: privateKey,
        client_email: clientEmail,
      },
    });
  }
  return analyticsDataClient;
}

async function runAnalyticsReport() {
  const client = getAnalyticsClient();

  const [response] = await client.runReport({
    property: `properties/${process.env.GOOGLE_CLIENT_PROPERTY}`,
    dateRanges: [
      {
        startDate: '2024-08-01',
        endDate: 'today',
      },
    ],
    dimensions: [
      { name: 'city' },
    ],
    metrics: [
      { name: 'activeUsers' },
    ],
  });

  return response;
}

export async function GET() {
  try {
    const report = await runAnalyticsReport();
    return NextResponse.json(report);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao gerar o relatório" });
  }
}
