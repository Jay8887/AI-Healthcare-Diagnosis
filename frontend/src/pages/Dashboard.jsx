import { useEffect, useState } from "react";
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
        <h1 className="text-2xl font-bold">Loading Dashboard...</h1>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8">
        AI Healthcare Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-gray-500">Total Predictions</h2>
          <p className="text-3xl font-bold mt-2">
            {stats.totalPredictions}
          </p>
        </div>

        <div className="bg-red-100 rounded-xl shadow-lg p-6">
          <h2 className="text-red-700">High Risk</h2>
          <p className="text-3xl font-bold mt-2">
            {stats.highRiskCases}
          </p>
        </div>

        <div className="bg-yellow-100 rounded-xl shadow-lg p-6">
          <h2 className="text-yellow-700">Moderate Risk</h2>
          <p className="text-3xl font-bold mt-2">
            {stats.moderateRiskCases}
          </p>
        </div>

        <div className="bg-green-100 rounded-xl shadow-lg p-6">
          <h2 className="text-green-700">Low Risk</h2>
          <p className="text-3xl font-bold mt-2">
            {stats.lowRiskCases}
          </p>
        </div>

        <div className="bg-blue-100 rounded-xl shadow-lg p-6">
          <h2 className="text-blue-700">Most Predicted Disease</h2>
          <p className="text-xl font-bold mt-2">
            {stats.mostPredictedDisease}
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;