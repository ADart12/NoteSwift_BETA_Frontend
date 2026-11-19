import api from "../api/axios";

/**
 * Fetch Executive Overview metrics, 9 KPI cards, monthly revenue trend, and comparisons.
 * @param {Object} filters
 */
export const getExecutiveOverview = async (filters = {}) => {
  const res = await api.get("/ceo/executive-overview", {
    params: filters,
  });
  return res.data;
};

/**
 * Fetch real pending actions for the CEO Action Center (pending leaves, expenses, budgets).
 */
export const getPendingActions = async () => {
  const res = await api.get("/ceo/pending-actions");
  return res.data;
};
