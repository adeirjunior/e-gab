import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

let analyticsDataClient: BetaAnalyticsDataClient | null = null;

function formatDateOneWeekAgo(): string {
  const date = new Date();

  // Subtrair 7 dias da data atual
  date.setDate(date.getDate() - 7);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

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
        type: 'service_account',
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
        startDate: formatDateOneWeekAgo(),
        endDate: 'today',
      },
    ],
    dimensions: [
      { name: 'hostname' },
      { name: 'pagePath' },
    ],
    metrics: [
      { name: 'activeUsers' },
      { name: 'screenPageViews' },
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'hostname',
        stringFilter: {
          matchType: 'EXACT',
          value: 'adeirju.egab.online', // Substitua pelo subdomínio correto
        },
      },
    },
  });

  return response;
}

export async function GET() {
  try {
    const report = await runAnalyticsReport();
    return NextResponse.json(report);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao gerar o relatório' });
  }
}
