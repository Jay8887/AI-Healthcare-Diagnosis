import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getDiseaseDistribution } from "../services/dashboardService";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#f59e0b",
  "#9333ea",
  "#0891b2",
  "#7c3aed",
  "#db2777",
];

function Analytics() {
  const [diseaseData, setDiseaseData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await getDiseaseDistribution();

      // Convert Map<String, Long> to array for Recharts
      const formattedData = Object.entries(response).map(
        ([disease, count]) => ({
          disease,
          count,
        })
      );

      setDiseaseData(formattedData);
    } catch (err) {
      console.error("Analytics Error:", err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">
          Disease Distribution
        </h2>

        <ResponsiveContainer width="100%" height={450}>
          <PieChart>
            <Pie
              data={diseaseData}
              dataKey="count"
              nameKey="disease"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
            >
              {diseaseData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}

export default Analytics;