import Header from "../../components/common/Header";
import AttendanceFilters from "../../components/attendanceCompo/AttendanceFilters";
import AttendanceTable from "../../components/attendanceCompo/AttendanceTable";
import Pagination from "../../components/common/Pagination";
import StatsCards from "../../components/common/StatsCards";

import { useEffect, useState, useCallback } from "react";
import { getEmployees } from "../../services/employeeServies";
import { getTodayAttendance } from "../../services/attendenceServices";
import { getDashboardSummary } from "../../services/dashboardSummary";
import { getDashboardStats } from "../../Data/statsCards";

const Attendance = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const fetchSummary = useCallback(async () => {
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (error) {
      console.error("Failed to fetch dashboard summary:", error);
    }
  }, []);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);

      const [employeesData, attendanceData] = await Promise.all([
        getEmployees({
          search: debouncedSearch,
          department,
          page: currentPage,
          limit: 10,
        }),
        getTodayAttendance(),
      ]);

      const attendances = attendanceData?.attendance || [];

      const mergedEmployees = (employeesData.employees || []).map((emp) => {
        const attendance = attendances.find(
          (att) => (att.employee?._id || att.employee) === emp._id
        );

        return {
          ...emp,
          status: attendance?.status || "Absent",
          checkIn: attendance?.checkIn || null,
          checkOut: attendance?.checkOut || null,
          checkInPhoto: attendance?.checkInPhoto || null,
          checkInLocation: attendance?.checkInLocation || null,
          checkOutPhoto: attendance?.checkOutPhoto || null,
          checkOutLocation: attendance?.checkOutLocation || null,
          workingHours: attendance?.workingHours || 0,
          overtime: attendance?.overtime || 0,
          isLate: attendance?.isLate || false,
          lateMinutes: attendance?.lateMinutes || 0,
        };
      });

      setEmployees(mergedEmployees);
      setTotalPages(employeesData.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch attendance employees:", err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, department, currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const stats = getDashboardStats(summary);

  return (
    <div className="min-h-screen bg-slate-100 p-6 space-y-6">
      <Header
        title="Attendance Management"
        subtitle="Track, monitor and manage daily employee attendance records"
        titleClassName="text-5xl font-extrabold tracking-tight text-white"
        subtitleClassName="mt-2 text-lg text-blue-100/90 font-normal"
        rightContent={
          <button
            onClick={() => window.print()}
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition shadow-sm"
          >
            Export
          </button>
        }
      />

      <StatsCards stats={stats} />

      <AttendanceFilters
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        setCurrentPage={setCurrentPage}
      />

      <AttendanceTable
        employees={employees}
        loading={loading}
        fetchEmployees={async () => {
          await fetchEmployees();
          await fetchSummary();
        }}
      />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Attendance;
