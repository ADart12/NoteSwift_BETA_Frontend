import { useAuth } from "../../context/AuthContext";
import Header from "../../components/common/Header";
import StatsCards from "../../components/common/StatsCards";
import AttendanceSummary from "../../components/dashboardCommon/AttendanceSummary";
import AttendanceChart from "../../components/dashboardCommon/AttendanceChart";
import RecentEmployees from "../../components/dashboardCommon/RecentEmployees";
import TodayAttendance from "../../components/dashboardCommon/TodayAttendance";
import EmployeeTimeline from "../../components/dashboardCommon/EmployeeTimeline";
import EmployeeMonthlyAttendance from "../../components/dashboardCommon/EmployeeMonthlyAttendance";
import SelfAttendanceWidget from "../../components/attendanceCompo/SelfAttendanceWidget";
import FinanceDashboard from "./FinanceDashboard";
import CEODashboard from "./CEODashboard";

import { useEffect, useState, useMemo } from "react";
import { getDashboardStats, employeeStats } from "../../Data/statsCards";
import {
  getDashboardSummary,
  getAttendanceOverview,
} from "../../services/dashboardSummary";

const Dashboard = () => {
  const { user } = useAuth();

  // Detect CEO / Super Admin / Admin roles → show Executive Command Center
  const isCEO = useMemo(() => {
    if (!user) return false;
    const role = (user.role || "").toLowerCase();
    return role === "ceo" || role === "super_admin" || role === "admin";
  }, [user]);

  const isFinanceManager = useMemo(() => {
    if (!user) return false;
    const role = (user.role || "").toLowerCase();
    const deptName = (user.department?.name || "").toLowerCase();
    const deptCode = (user.department?.code || "").toUpperCase();
    const designation = (user.designation || "").toLowerCase();
    const email = (user.email || "").toLowerCase();

    return (
      email === "tekraj@noteswift.com" ||
      email === "finance.manager@noteswift.com" ||
      role === "finance_manager" ||
      ((role === "manager" || role === "c_level") &&
        (deptName === "finance" || deptCode === "FIN" || designation.includes("finance")))
    );
  }, [user]);

  const [summary, setSummary] = useState(null);
  const [overview, setOverview] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time clock for header
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = useMemo(() => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }, [currentTime]);

  const formattedDate = useMemo(() => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [currentTime]);

  const formattedClock = useMemo(() => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, [currentTime]);

  // Fetch Summary & Overview for Admin and Managers (non-finance)
  useEffect(() => {
    if (!user || user.role === "employee" || isFinanceManager) return;

    const fetchData = async () => {
      try {
        const [sumData, overviewData] = await Promise.all([
          getDashboardSummary(),
          getAttendanceOverview(),
        ]);
        setSummary(sumData);
        setOverview(overviewData.overview || []);
      } catch (error) {
        console.error("Dashboard data fetch error:", error);
      }
    };

    fetchData();
  }, [user, isFinanceManager]);

  const stats = getDashboardStats(summary);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh] text-gray-500 font-medium">
        Loading dashboard...
      </div>
    );
  }

  // ⭐ CEO / Super Admin / Admin → Executive Command Center
  if (isCEO) {
    return <CEODashboard />;
  }

  // ⭐ If user is Finance Manager, display the dedicated Finance Dashboard matching Image 3!
  if (isFinanceManager) {
    return <FinanceDashboard />;
  }

  return (
    <div className="space-y-6">
      {/* =========================
          HEADER WITH LIVE CLOCK
      ========================= */}
      <Header
        title={`${greeting}, ${user.fullName} 👋`}
        subtitle="Welcome back to your Employee Attendance Management System."
        titleClassName="text-4xl font-extrabold tracking-tight text-white"
        subtitleClassName="mt-3 text-lg text-blue-100/90 font-normal"
        rightContent={
          <div className="text-right text-white">
            <p className="text-base font-medium opacity-90">{formattedDate}</p>
            <p className="mt-1 text-3xl font-bold tracking-wide font-mono">
              {formattedClock}
            </p>
          </div>
        }
      />

      {/* =========================
          SELF ATTENDANCE WIDGET (WEBCAM & GEO-TAG)
      ========================= */}
      <SelfAttendanceWidget
        onAttendanceUpdated={() => {
          if (user.role === "admin" || user.role === "manager") {
            getDashboardSummary().then((sumData) => setSummary(sumData));
          }
        }}
      />

      {/* =========================
          ADMIN & MANAGERS
      ========================= */}
      {(user.role === "admin" || user.role === "manager") && (
        <>
          <StatsCards stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AttendanceSummary summary={summary} />
            <AttendanceChart overview={overview} />
            <TodayAttendance />
            <RecentEmployees />
          </div>
        </>
      )}

      {/* =========================
          NORMAL EMPLOYEE DETAILS
      ========================= */}
      {user.role === "employee" && (
        <>
          <StatsCards stats={employeeStats()} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EmployeeTimeline />
            <EmployeeMonthlyAttendance />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
