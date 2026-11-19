import api from "../api/axios";

export const getEmployees = async (params = {}) => {
  const res = await api.get("/employee", {
    params,
  });
  return res.data;
};

export const createEmployee = async (data) => {
  const res = await api.post("/employee", data);
  return res.data;
};

export const getEmployeeById = async (id) => {
  const res = await api.get(`/employee/${id}`);
  return res.data;
};

export const updateEmployee = async (id, data) => {
  const res = await api.patch(`/employee/${id}`, data);
  return res.data;
};

export const updateEmployeeStatus = async (id, status) => {
  const res = await api.patch(`/employee/${id}/status`, { status });
  return res.data;
};

export const deleteEmployee = async (id) => {
  const res = await api.delete(`/employee/${id}`);
  return res.data;
};

export const getDesignations = async (department) => {
  const res = await api.get("/designations", {
    params: department ? { department } : {},
  });
  return res.data;
};
