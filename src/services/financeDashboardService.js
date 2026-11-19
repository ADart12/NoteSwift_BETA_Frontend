import api from "../api/axios";

export const getFinanceDashboardSummary = async () => {
  const response = await api.get("/finance/dashboard/summary");
  return response.data;
};
