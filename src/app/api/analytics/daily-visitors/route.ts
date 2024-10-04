import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { getSession } from '@/lib/auth/get-session';
import { getWebsiteByUserId } from '@/lib/fetchers/site';

let analyticsDataClient: BetaAnalyticsDataClient | null = null;

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

// Função para formatar a data
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(date); // Formata a data para "MMM YY"
};

// Função para buscar os visitantes diários
async function getDailyVisitorsForSubdomain() {
    const client = getAnalyticsClient();

    // Definir a data de início e fim (últimos 60 dias)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 60);
    const session = await getSession()

    const website = await getWebsiteByUserId(session?.user.id!);

    const [response] = await client.runReport({
        property: `properties/${process.env.GOOGLE_CLIENT_PROPERTY}`, // Substitua pelo ID da propriedade
        dateRanges: [
            {
                startDate: startDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
                endDate: endDate.toISOString().split('T')[0],
            },
        ],
        dimensions: [
            { name: 'date' }, // Para agrupar por data
            { name: 'hostname' }, // Filtrando pelo hostname (subdomínio)
        ],
        metrics: [
            { name: 'activeUsers' }, // Métrica de usuários ativos
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

    // Mapear o resultado para extrair datas e usuários ativos
    const data = response.rows?.map((row) => {
        const dateValue = row.dimensionValues?.[0]?.value;
        const activeUsersValue = row.metricValues?.[0]?.value;

        if (dateValue && activeUsersValue) {
            return {
                date: formatDate(dateValue), // Formata a data
                activeUsers: parseInt(activeUsersValue, 10), // Usuários ativos
            };
        }
        return null; // Retorna null se os valores não existirem
    }).filter((item) => item !== null); // Filtra os nulls

    return data || [];
}

// Endpoint da API
export async function GET() {
    try {
        const visitorsData = await getDailyVisitorsForSubdomain();

        // Verifica os dados retornados pela API
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
