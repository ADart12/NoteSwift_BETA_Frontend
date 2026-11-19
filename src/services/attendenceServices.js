import api from "../api/axios";

// Get employee's own today's status
export const getMyAttendance = async () => {
  const response = await api.get("/attendence/me");
  return response.data;
};

// Employee self check-in with webcam photo & geo-tag
export const checkIn = async ({ photo, location } = {}) => {
  const response = await api.post("/attendence/check-in", {
    photo,
    location,
  });
  return response.data;
};

// Employee self check-out
export const checkOut = async ({ photo, location } = {}) => {
  const res = await api.patch("/attendence/check-out", {
    photo,
    location,
  });
  return res.data;
};

// Admin & Managers get today's attendance for all staff
export const getTodayAttendance = async () => {
  const response = await api.get("/attendence/today");
  return response.data;
};

// Employee monthly summary
export const getMyAttendanceSummary = async (month) => {
  const res = await api.get("/attendence/my/summary", {
    params: {
      month,
    },
  });
  return res.data;
};

// Employee history
export const getMyAttendenceHistory = async (range) => {
  const res = await api.get("/attendence/me/history", {
    params: {
      range,
    },
  });
  return res.data;
};
