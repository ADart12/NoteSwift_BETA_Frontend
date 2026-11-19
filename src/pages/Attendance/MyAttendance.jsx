import { useMemo, useState, useEffect, useCallback } from "react";

import AttendanceSummary from "../../components/myAttendanceCompo/AttendanceSummary";
import AttendanceFilters from "../../components/myAttendanceCompo/AttendanceFilters";
import AttendanceChart from "../../components/myAttendanceCompo/AttendanceChart";
import AttendanceTable from "../../components/myAttendanceCompo/AttendanceTable";
import SelfAttendanceWidget from "../../components/attendanceCompo/SelfAttendanceWidget";
import Header from "../../components/common/Header";
import { CalendarDays } from "lucide-react";
import Pagination from "../../components/common/Pagination";

import {
  getMyAttendanceSummary,
  getMyAttendenceHistory,
} from "../../services/attendenceServices";

import { myAttendenceStats } from "../../Data/attendance";

const MyAttendance = () => {
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [summary, setSummary] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  const recordsPerPage = 5;

  const getCurrentMonth = useCallback(() => {
    const date = new Date();

    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
  }, []);

  const [month, setMonth] = useState(getCurrentMonth());

  // Summary - always current month
  const fetchSummary = useCallback(async () => {
    try {
      const data = await getMyAttendanceSummary(getCurrentMonth());
      setSummary(data.summary);
    } catch (error) {
      console.error("Failed to fetch attendance summary:", error);
    }
  }, [getCurrentMonth]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const attendenceStats = myAttendenceStats(summary);

  // Attendance history
  const attendenceHistory = useCallback(async (selectedMonth = null) => {
    try {
      const range = selectedMonth || "2w";

      const data = await getMyAttendenceHistory(range);

      setAttendanceData(data.attendanceHistory || []);
    } catch (error) {
      console.error(
        "Error while getting my attendance history:",
        error.message
      );
    }
  }, []);

  // Initial load → last 2 weeks
  useEffect(() => {
    attendenceHistory(month);
  }, [attendenceHistory, month]);

  const handleAttendanceUpdated = () => {
    fetchSummary();
    attendenceHistory(month);
  };

  // Status filter only
  const filteredAttendance = useMemo(() => {
    return attendanceData.filter((record) => {
      const recordStatus = String(record.status || "").toLowerCase();

      return (
        status === "All" ||
        recordStatus === status.toLowerCase()
      );
    });
  }, [attendanceData, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAttendance.length / recordsPerPage)
  );

  const paginatedAttendance = filteredAttendance.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Month change
  const handleMonthChange = (value) => {
    setMonth(value);
    setCurrentPage(1);
    attendenceHistory(value);
  };

  // Status change
  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  // Reset
  const handleReset = () => {
    const defaultMonth = getCurrentMonth();
    setMonth(defaultMonth);
    setStatus("All");
    setCurrentPage(1);
    attendenceHistory(defaultMonth);
  };

  return (
    <div className="space-y-6">
      <Header
        title="My Attendance"
        titleClassName="text-3xl"
        subtitle="Capture your attendance with laptop webcam and geo-location"
        rightContent={
          <button className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 text-gray-600 shadow-sm">
            <CalendarDays className="h-5 w-5 text-blue-600" />

            <span>
              {new Date().toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </button>
        }
      />

      {/* Employee Self-Attendance Widget (Webcam + Geo-Tag) */}
      <SelfAttendanceWidget onAttendanceUpdated={handleAttendanceUpdated} />

      <AttendanceSummary
        summary={summary}
        attendenceStats={attendenceStats}
      />

      <AttendanceChart 
        summary={summary}
      />

      <AttendanceFilters
        month={month}
        setMonth={handleMonthChange}
        status={status}
        setStatus={handleStatusChange}
        onReset={handleReset}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <AttendanceTable
          attendance={paginatedAttendance}
        />

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default MyAttendance;
