import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ShieldCheck,
  Brain,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { getDashboardStats } from "../services/dashboardService";
import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold animate-pulse">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  const riskData = [
    {
      risk: "High",
      cases: stats.highRiskCases,
    },
    {
      risk: "Moderate",
      cases: stats.moderateRiskCases,
    },
    {
      risk: "Low",
      cases: stats.lowRiskCases,
    },
  ];
  const COLORS = [
  "#2563EB",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

const diseaseData = [
  {
    name: stats.mostPredictedDisease || "Others",
    value: stats.totalPredictions,
  },
  {
    name: "High Risk",
    value: stats.highRiskCases,
  },
  {
    name: "Moderate Risk",
    value: stats.moderateRiskCases,
  },
  {
    name: "Low Risk",
    value: stats.lowRiskCases,
  },
];

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-800">
          AI Healthcare Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor AI prediction statistics and patient health insights.
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {new Date().toLocaleDateString()}
        </p>
      </div>
{/* Welcome Banner */}

<div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-8 mb-10">

  <h2 className="text-3xl font-bold">
    Welcome to AI Healthcare Diagnosis System
  </h2>

  <p className="mt-4 text-blue-100 text-lg">
    Predict diseases using Artificial Intelligence, analyze patient health,
    visualize healthcare analytics, and generate professional reports securely.
  </p>

</div> 
<div className="flex justify-end mb-6">
    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
      Last Updated: {new Date().toLocaleString()}
    </span>
  </div>



      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        {/* Total Predictions */}

        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-center">
            <Activity size={42} className="text-blue-600" />
            <span className="text-blue-600 font-semibold">
              Total
            </span>
          </div>

          <h2 className="text-gray-500 mt-5">
            Total Predictions
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            {stats.totalPredictions}
          </h1>

          <div className="mt-5 h-2 rounded-full bg-gray-200">
            <div className="h-2 w-full rounded-full bg-blue-600"></div>
          </div>

        </div>

        {/* High Risk */}

        <div className="bg-red-50 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-center">
            <AlertTriangle size={42} className="text-red-600" />
            <span className="text-red-600 font-semibold">
              Critical
            </span>
          </div>

          <h2 className="text-red-700 mt-5">
            High Risk Cases
          </h2>

          <h1 className="text-4xl font-bold mt-2 text-red-700">
            {stats.highRiskCases}
          </h1>

          <div className="mt-5 h-2 rounded-full bg-red-200">

            <div
              className="h-2 rounded-full bg-red-600"
              style={{
                width: `${Math.min(
                  (stats.highRiskCases /
                    Math.max(stats.totalPredictions, 1)) *
                    100,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

        {/* Moderate Risk */}

        <div className="bg-yellow-50 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-center">
            <TrendingUp size={42} className="text-yellow-600" />
            <span className="text-yellow-700 font-semibold">
              Moderate
            </span>
          </div>

          <h2 className="text-yellow-700 mt-5">
            Moderate Risk
          </h2>

          <h1 className="text-4xl font-bold mt-2 text-yellow-700">
            {stats.moderateRiskCases}
          </h1>

          <div className="mt-5 h-2 rounded-full bg-yellow-200">

            <div
              className="h-2 rounded-full bg-yellow-500"
              style={{
                width: `${Math.min(
                  (stats.moderateRiskCases /
                    Math.max(stats.totalPredictions, 1)) *
                    100,
                  100
                )}%`,
              }}
            />

          </div>

        </div>
                {/* Low Risk */}

        <div className="bg-green-50 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-center">
            <ShieldCheck size={42} className="text-green-600" />

            <span className="text-green-700 font-semibold">
              Safe
            </span>
          </div>

          <h2 className="text-green-700 mt-5">
            Low Risk Cases
          </h2>

          <h1 className="text-4xl font-bold mt-2 text-green-700">
            {stats.lowRiskCases}
          </h1>

          <div className="mt-5 h-2 rounded-full bg-green-200">

            <div
              className="h-2 rounded-full bg-green-600"
              style={{
                width: `${Math.min(
                  (stats.lowRiskCases /
                    Math.max(stats.totalPredictions, 1)) *
                    100,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

        {/* Disease */}

        <div className="bg-indigo-50 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between items-center">
            <Brain size={42} className="text-indigo-600" />

            <span className="text-indigo-600 font-semibold">
              AI
            </span>
          </div>

          <h2 className="text-indigo-700 mt-5">
            Most Predicted Disease
          </h2>

          <h1 className="text-xl font-bold mt-2 text-indigo-700 break-words">
            {stats.mostPredictedDisease || "N/A"}
          </h1>

        </div>

      </div>

      {/* Risk Distribution */}

      <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Risk Distribution
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <BarChart data={riskData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="risk" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="cases"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>
      {/* Disease Distribution */}

<div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

  <h2 className="text-2xl font-bold mb-6">
    Disease Distribution
  </h2>

  <ResponsiveContainer width="100%" height={420}>

    <PieChart>

      <Pie
        data={diseaseData}
        dataKey="value"
        nameKey="name"
        outerRadius={140}
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
  {/* Quick Statistics */}

<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">

  <div className="bg-blue-100 rounded-xl p-6 text-center shadow">
    <h3 className="text-3xl font-bold text-blue-700">
      {stats.totalPredictions}
    </h3>
    <p className="text-gray-700 mt-2">
      Total Predictions
    </p>
  </div>

  <div className="bg-red-100 rounded-xl p-6 text-center shadow">
    <h3 className="text-3xl font-bold text-red-700">
      {Math.round((stats.highRiskCases / Math.max(stats.totalPredictions,1))*100)}%
    </h3>
    <p className="text-gray-700 mt-2">
      High Risk
    </p>
  </div>

  <div className="bg-yellow-100 rounded-xl p-6 text-center shadow">
    <h3 className="text-3xl font-bold text-yellow-700">
      {Math.round((stats.moderateRiskCases / Math.max(stats.totalPredictions,1))*100)}%
    </h3>
    <p className="text-gray-700 mt-2">
      Moderate Risk
    </p>
  </div>

  <div className="bg-green-100 rounded-xl p-6 text-center shadow">
    <h3 className="text-3xl font-bold text-green-700">
      {Math.round((stats.lowRiskCases / Math.max(stats.totalPredictions,1))*100)}%
    </h3>
    <p className="text-gray-700 mt-2">
      Low Risk
    </p>
  </div>

</div>

</div>

      {/* Dashboard Summary */}

      <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Dashboard Summary
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="space-y-3">

            <p>
              <strong>Total Predictions:</strong> {stats.totalPredictions}
            </p>

            <p>
              <strong>High Risk Cases:</strong> {stats.highRiskCases}
            </p>

            <p>
              <strong>Moderate Risk Cases:</strong> {stats.moderateRiskCases}
            </p>

            <p>
              <strong>Low Risk Cases:</strong> {stats.lowRiskCases}
            </p>

          </div>

          <div className="flex flex-col justify-center">

            <p className="text-gray-500">
              Most Predicted Disease
            </p>

            <h1 className="text-3xl font-bold text-indigo-700 mt-2">
              {stats.mostPredictedDisease || "N/A"}
            </h1>

          </div>

        </div>

      </div>

{/* AI Features */}

<div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

  <h2 className="text-2xl font-bold mb-6">
    AI Healthcare Features
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    <div>✅ AI Disease Prediction</div>

    <div>✅ Risk Classification</div>

    <div>✅ Patient History</div>

    <div>✅ Dashboard Analytics</div>

    <div>✅ PDF Report Generation</div>

    <div>✅ Secure JWT Authentication</div>

  </div>

</div>
      {/* Health Tips */}

      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl shadow-lg mt-10 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Healthcare Tips
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-gray-700">

          <p>💧 Drink at least 2–3 liters of water every day.</p>

          <p>🥗 Eat a balanced and nutritious diet.</p>

          <p>🏃 Exercise for at least 30 minutes daily.</p>

          <p>😴 Get 7–8 hours of quality sleep.</p>

          <p>🩺 Schedule regular health check-ups.</p>

          <p>❤️ Follow your doctor's advice for high-risk conditions.</p>

        </div>

      </div>
      <footer className="mt-12 border-t pt-6 text-center text-gray-500">

  <h3 className="font-bold text-lg text-gray-700">
    AI Healthcare Diagnosis System
  </h3>

  <p className="mt-2">
    Developed by Devdatt Tiwari
  </p>

  <p>
    United Institute of Technology
  </p>

  <p className="mt-2">
    © 2026 All Rights Reserved
  </p>

</footer>

    </DashboardLayout>
  );
}

export default Dashboard;