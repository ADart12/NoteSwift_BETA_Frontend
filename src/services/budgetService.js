import api from "../api/axios";

// Get All Budgets with optional filters (fiscalYear, status, department, search)
export const getBudgets = async (params = {}) => {
  const response = await api.get("/finance/budgets", { params });
  return response.data;
};

// Get Budget Overview Stats (Allocated, Spent, Balance, Department Breakdowns)
export const getBudgetStats = async (fiscalYear = "FY 2026-27") => {
  const response = await api.get("/finance/budgets/stats", {
    params: { fiscalYear },
  });
  return response.data;
};

// Get Single Budget Details
export const getBudgetById = async (id) => {
  const response = await api.get(`/finance/budgets/${id}`);
  return response.data;
};

// Create / Allocate New Department Budget
export const createBudget = async (budgetData) => {
  const response = await api.post("/finance/budgets", budgetData);
  return response.data;
};

// Update Budget Allocation
export const updateBudget = async (id, budgetData) => {
  const response = await api.put(`/finance/budgets/${id}`, budgetData);
  return response.data;
};

// Quick Add Funds / Top-Up
export const addFunds = async (id, amount) => {
  const response = await api.post(`/finance/budgets/${id}/add-funds`, { amount });
  return response.data;
};

// Soft Delete Budget
export const deleteBudget = async (id) => {
  const response = await api.delete(`/finance/budgets/${id}`);
  return response.data;
};

// Approve Budget
export const approveBudget = async (id) => {
  const response = await api.patch(`/finance/budgets/${id}/approve`);
  return response.data;
};

// Reject Budget
export const rejectBudget = async (id) => {
  const response = await api.patch(`/finance/budgets/${id}/reject`);
  return response.data;
};

// Create Expense (for Quick Action modal on Dashboard / Budget)
export const createExpense = async (expenseData) => {
  const response = await api.post("/finance/expenses", expenseData);
  return response.data;
};

// Fetch Department List for dropdown selection
export const getDepartmentList = async () => {
  try {
    const response = await api.get("/department");
    return response.data?.departments || response.data?.data || response.data || [];
  } catch (err) {
    console.warn("Could not fetch departments dynamically:", err.message);
    return [];
  }
};
