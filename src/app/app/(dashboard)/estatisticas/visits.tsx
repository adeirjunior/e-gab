import { ReportResponse } from "@/lib/types/types";

export default function Visits({ reportData }: { reportData: ReportResponse }) {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full rounded-md border-collapse border border-gray-200 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                            Subdominio
                        </th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                            Página
                        </th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                            Usuários Ativos
                        </th>
                        <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                            Visitas
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.rows.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center text-gray-900 dark:text-gray-100">
                                {row.dimensionValues[0].value}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center text-gray-900 dark:text-gray-100">
                                {row.dimensionValues[1].value}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center text-gray-900 dark:text-gray-100">
                                {row.metricValues[0].value}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center text-gray-900 dark:text-gray-100">
                                {row.metricValues[1].value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}