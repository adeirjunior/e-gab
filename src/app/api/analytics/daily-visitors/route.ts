import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { getSession } from '@/lib/auth/get-session';
import { getWebsiteByUserId } from '@/lib/fetchers/site';

let analyticsDataClient: BetaAnalyticsDataClient | null = null;

export function formatDateOneWeekAgo(): string {
    const date = new Date();
   
    date.setDate(date.getDate() - 60);

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
            throw new Error('Credenciais do Google Analytics estão faltando.');
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

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(date);
};

async function getDailyVisitorsForSubdomain() {
    const client = getAnalyticsClient();

    const session = await getSession();
    const website = await getWebsiteByUserId(session?.user.id!);

    const [response] = await client.runReport({
        property: `properties/${process.env.GOOGLE_CLIENT_PROPERTY}`,
        dateRanges: [
            {
                startDate: formatDateOneWeekAgo(),
                endDate: 'today',
            },
        ],
        dimensions: [
            { name: 'date' },
            { name: 'hostname' },
        ],
        metrics: [
            { name: 'activeUsers' },
        ],
        dimensionFilter: {
            filter: {
                fieldName: 'hostname',
                stringFilter: {
                    matchType: 'EXACT',
                    value: website?.customDomain || `${website?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
                },
            },
        },
    });

    const data = response.rows?.map((row) => {
        const dateValue = row.dimensionValues?.[0]?.value;
        const activeUsersValue = row.metricValues?.[0]?.value;

        if (dateValue && activeUsersValue) {
            return {
                date: formatDate(dateValue),
                activeUsers: parseInt(activeUsersValue, 10),
            };
        }
        return null;
    }).filter((item) => item !== null);

    return data || [];
}

export async function GET() {
    try {
        const visitorsData = await getDailyVisitorsForSubdomain();

        console.log('Dados retornados da API:', visitorsData);

        if (!Array.isArray(visitorsData)) {
            console.error("O formato dos dados não é um array:", visitorsData);
            return NextResponse.json({ error: 'Formato de dados inesperado.' });
        }

        return NextResponse.json(visitorsData);
    } catch (error) {
        console.error('Erro ao buscar os dados do Google Analytics:', error);
        return NextResponse.json({ error: 'Erro ao buscar os dados do Google Analytics' });
    }
}
