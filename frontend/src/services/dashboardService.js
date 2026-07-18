import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

export const getDiseaseDistribution = async () => {
  const response = await api.get("/dashboard/disease-distribution");
  return response.data;
};

export const getMonthlyTrends = async () => {
  const response = await api.get("/dashboard/monthly-trends");
  return response.data;
};