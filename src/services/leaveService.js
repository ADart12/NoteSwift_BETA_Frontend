import api from "../api/axios";

export const getLeaveSummary = async (status = "all") => {
  const res = await api.get("/leave/summary", {
    params: { status },
  });

  return res.data;
};

export const getAllLeaves = async ({
  search = "",
  department = "",
  leaveType = "",
  status = "Pending",
  page = 1,
  limit = 10,
} = {}) => {
  const res = await api.get("/leave", {
    params: {
      search,
      department,
      leaveType,
      status,
      page,
      limit,
    },
  });

  return res.data;
};

export const approveLeave = async (id) => {
  const res = await api.patch(`/leave/${id}/approve`);
  return res.data;
};

export const reject = async (id) => {
  const res = await api.patch(`/leave/${id}/reject`);
  return res.data;
};

export const getMyLeaveRequest = async (page = 1) => {
  const res = await api.get(`/leave/me?page=${page}`);
  return res.data;
};

export const applyForLeave = async (formData) => {
  const res = await api.post("/leave", formData);
  return res.data;
};
