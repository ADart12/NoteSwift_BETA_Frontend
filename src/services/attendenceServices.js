import api from "../api/axios";

export const getTodayAttendance = async () => {
    const response = await api.get("/attendence/today");
    return response.data;
};

export const checkIn = async (employeeId) => {
    const response = await api.post("attendence/check-in",
        { employee: employeeId },
    )
    return response.data;
}


export const checkOut = async (employeeId) => {
    const res = await api.patch("attendence/check-out",
        { employee: employeeId }
    );

    return res.data;
};

export const getMyAttendanceSummary = async (month) => {
    const res = await api.get("attendence/my/summary", {
        params: {
            month,
        },
    });

    return res.data;
};

export const getMyAttendenceHistory = async (range) => {
    const res = await api.get("attendence/me/history", {
        params: {
            range
        }
    })
    return res.data;
}
