import api from "../api/axios";

export const getOfficeSettings = async () => {
  const res = await api.get("/settings");
  return res.data;
};

export const updateOfficeSettings = async (settingsData) => {
  const res = await api.put("/settings", settingsData);
  return res.data;
};
