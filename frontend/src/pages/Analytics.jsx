import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  getDiseaseDistribution,
  getMonthlyTrends,
} from "../services/dashboardService";

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
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Disease Distribution
      const diseaseResponse = await getDiseaseDistribution();

      const formattedDisease = Object.entries(diseaseResponse).map(
        ([disease, count]) => ({
          disease,
          count,
        })
      );

      setDiseaseData(formattedDisease);

      // Monthly Trends
      const monthlyResponse = await getMonthlyTrends();

      const formattedMonthly = monthlyResponse.map((item) => ({
        month: item.month.substring(0, 3),
        predictions: item.predictions,
      }));

      setMonthlyData(formattedMonthly);

    } catch (err) {
      console.error("Analytics Error:", err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      {/* Disease Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
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

      {/* Monthly Prediction Trends */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">
          Monthly Prediction Trends
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="predictions"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}

export default Analytics;