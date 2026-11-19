import api from "../api/axios";

// Get all expenses (supports optional filters)
export const getExpenses = async (params = {}) => {
  const response = await api.get("/finance/expenses", { params });
  return response.data;
};

// Get single expense by ID
export const getExpenseById = async (id) => {
  const response = await api.get(`/finance/expenses/${id}`);
  return response.data;
};

// Create a new expense
export const createExpense = async (expenseData) => {
  const response = await api.post("/finance/expenses", expenseData);
  return response.data;
};

// Update an expense
export const updateExpense = async (id, expenseData) => {
  const response = await api.put(`/finance/expenses/${id}`, expenseData);
  return response.data;
};

// Soft delete an expense
export const deleteExpense = async (id) => {
  const response = await api.delete(`/finance/expenses/${id}`);
  return response.data;
};
