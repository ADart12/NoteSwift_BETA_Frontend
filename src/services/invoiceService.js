import api from "../api/axios";

// Get all invoices (supports ?status, ?type, ?search, ?month)
export const getInvoices = async (params = {}) => {
  const response = await api.get("/finance/invoices", { params });
  return response.data; // { success, count, stats, data }
};

// Get invoice stats summary
export const getInvoiceStats = async () => {
  const response = await api.get("/finance/invoices/stats");
  return response.data;
};

// Get single invoice
export const getInvoiceById = async (id) => {
  const response = await api.get(`/finance/invoices/${id}`);
  return response.data;
};

// Create invoice
export const createInvoice = async (invoiceData) => {
  const response = await api.post("/finance/invoices", invoiceData);
  return response.data;
};

// Update invoice
export const updateInvoice = async (id, invoiceData) => {
  const response = await api.put(`/finance/invoices/${id}`, invoiceData);
  return response.data;
};

// Record a payment against an invoice
export const recordPayment = async (id, paymentData) => {
  const response = await api.post(`/finance/invoices/${id}/payment`, paymentData);
  return response.data;
};

// Cancel invoice
export const cancelInvoice = async (id) => {
  const response = await api.patch(`/finance/invoices/${id}/cancel`);
  return response.data;
};

// Soft delete invoice
export const deleteInvoice = async (id) => {
  const response = await api.delete(`/finance/invoices/${id}`);
  return response.data;
};
