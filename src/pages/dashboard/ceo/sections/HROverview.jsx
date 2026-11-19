import { useState } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  Clock,
  Calendar,
  BarChart2,
  TrendingDown,
  TrendingUp,
  Award,
  ChevronRight,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HROverview = () => {
  // Department-wise Employee Distribution (PieChart)
  const deptDistributionData = [
    { name: "Academics", value: 18, color: "#6366f1" },
    { name: "Tech", value: 15, color: "#06b6d4" },
    { name: "Sales", value: 18, color: "#22c55e" },
    { name: "Ops", value: 12, color: "#f59e0b" },
    { name: "Marketing", value: 10, color: "#ec4899" },
    { name: "HR", value: 8, color: "#a855f7" },
    { name: "Finance", value: 6, color: "#f97316" },
  ];

  // Monthly Attendance % trend (AreaChart) - 12 months, 88%-96%
  const monthlyAttendanceData = [
    { month: "Dec 25", rate: 89.2, present: 74, total: 83 },
    { month: "Jan 26", rate: 90.5, present: 75, total: 83 },
    { month: "Feb 26", rate: 88.4, present: 74, total: 84 },
    { month: "Mar 26", rate: 91.8, present: 77, total: 84 },
    { month: "Apr 26", rate: 93.2, present: 79, total: 85 },
    { month: "May 26", rate: 92.0, present: 78, total: 85 },
    { month: "Jun 26", rate: 94.5, present: 81, total: 86 },
    { month: "Jul 26", rate: 91.1, present: 78, total: 86 },
    { month: "Aug 26", rate: 95.3, present: 82, total: 86 },
    { month: "Sep 26", rate: 93.8, present: 81, total: 86 },
    { month: "Oct 26", rate: 96.0, present: 83, total: 86 },
    { month: "Nov 26", rate: 92.7, present: 76, total: 82 },
  ];

  // Employee Turnover Rate chart (LineChart) - 12 months, turnover 1-4 employees
  const turnoverData = [
    { month: "Dec", resigned: 2, joined: 3, rate: 2.4 },
    { month: "Jan", resigned: 1, joined: 4, rate: 1.2 },
    { month: "Feb", resigned: 3, joined: 2, rate: 3.5 },
    { month: "Mar", resigned: 2, joined: 5, rate: 2.3 },
    { month: "Apr", resigned: 1, joined: 4, rate: 1.1 },
    { month: "May", resigned: 4, joined: 3, rate: 4.6 },
    { month: "Jun", resigned: 2, joined: 5, rate: 2.3 },
    { month: "Jul", resigned: 1, joined: 3, rate: 1.1 },
    { month: "Aug", resigned: 2, joined: 4, rate: 2.3 },
    { month: "Sep", resigned: 3, joined: 6, rate: 3.4 },
    { month: "Oct", resigned: 1, joined: 3, rate: 1.1 },
    { month: "Nov", resigned: 2, joined: 5, rate: 2.3 },
  ];

  // Pending Leave Requests - 8 rows
  const [leaveRequests] = useState([
    {
      id: "LR-101",
      employee: "Aarav Sharma",
      department: "Technology",
      type: "Casual",
      from: "19 Nov 2026",
      to: "21 Nov 2026",
      days: 3,
      status: "Pending",
      avatar: "AS",
    },
    {
      id: "LR-102",
      employee: "Priya Nair",
      department: "Academics",
      type: "Sick",
      from: "17 Nov 2026",
      to: "18 Nov 2026",
      days: 2,
      status: "Approved",
      avatar: "PN",
    },
    {
      id: "LR-103",
      employee: "Vikram Malhotra",
      department: "Sales",
      type: "Annual",
      from: "24 Nov 2026",
      to: "28 Nov 2026",
      days: 5,
      status: "Pending",
      avatar: "VM",
    },
    {
      id: "LR-104",
      employee: "Sneha Kulkarni",
      department: "HR",
      type: "Maternity",
      from: "01 Dec 2026",
      to: "28 Feb 2027",
      days: 90,
      status: "Approved",
      avatar: "SK",
    },
    {
      id: "LR-105",
      employee: "Rohan Deshmukh",
      department: "Operations",
      type: "Casual",
      from: "20 Nov 2026",
      to: "20 Nov 2026",
      days: 1,
      status: "Pending",
      avatar: "RD",
    },
    {
      id: "LR-106",
      employee: "Ananya Iyer",
      department: "Marketing",
      type: "Sick",
      from: "15 Nov 2026",
      to: "16 Nov 2026",
      days: 2,
      status: "Approved",
      avatar: "AI",
    },
    {
      id: "LR-107",
      employee: "Karan Johar",
      department: "Finance",
      type: "Annual",
      from: "22 Nov 2026",
      to: "26 Nov 2026",
      days: 5,
      status: "Rejected",
      avatar: "KJ",
    },
    {
      id: "LR-108",
      employee: "Divya Menon",
      department: "Technology",
      type: "Casual",
      from: "25 Nov 2026",
      to: "26 Nov 2026",
      days: 2,
      status: "Pending",
      avatar: "DM",
    },
  ]);

  // Department-wise Employee Distribution table
  const deptTableData = [
    {
      department: "Academics",
      head: "Dr. Sunita Rao",
      total: 18,
      active: 17,
      onLeave: 1,
      avgAttendance: "94.2%",
      color: "border-l-indigo-500",
    },
    {
      department: "Technology",
      head: "Karthik Verma",
      total: 15,
      active: 14,
      onLeave: 1,
      avgAttendance: "95.6%",
      color: "border-l-cyan-500",
    },
    {
      department: "Sales & Growth",
      head: "Rajesh Khanna",
      total: 18,
      active: 17,
      onLeave: 1,
      avgAttendance: "91.4%",
      color: "border-l-emerald-500",
    },
    {
      department: "Operations",
      head: "Meera Sen",
      total: 12,
      active: 12,
      onLeave: 0,
      avgAttendance: "93.8%",
      color: "border-l-amber-500",
    },
    {
      department: "Marketing",
      head: "Tanvi Saxena",
      total: 10,
      active: 9,
      onLeave: 1,
      avgAttendance: "89.5%",
      color: "border-l-pink-500",
    },
    {
      department: "Human Resources",
      head: "Pooja Hegde",
      total: 8,
      active: 8,
      onLeave: 0,
      avgAttendance: "96.1%",
      color: "border-l-purple-500",
    },
    {
      department: "Finance & Accounts",
      head: "Tek Raj Bhatt",
      total: 6,
      active: 5,
      onLeave: 1,
      avgAttendance: "92.0%",
      color: "border-l-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Human Resources Overview (CHRO)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              FY 2026-27
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Workforce analytics, headcount metrics, attendance tracking, and leave pipeline
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs">
          <Calendar size={14} className="text-slate-400" />
          <span>Today: 17 Nov 2026</span>
        </div>
      </div>

      {/* Row 1: 7 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {/* 1. Total Employees */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-3 hover:shadow-md transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">
              Total Staff
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-0.5">87</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 truncate">
              ↑ 6.1% vs Q2
            </p>
          </div>
        </div>

        {/* 2. Active Employees */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-3 hover:shadow-md transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">
              Active Staff
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-0.5">82</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 truncate">
              ↑ 5 this month
            </p>
          </div>
        </div>

        {/* 3. New Employees */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-3 hover:shadow-md transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <UserPlus size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">
              New Joiners
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-0.5">5</h3>
            <p className="text-[11px] text-blue-600 font-semibold mt-1 truncate">
              This month
            </p>
          </div>
        </div>

        {/* 4. On Probation */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-3 hover:shadow-md transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">
              On Probation
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-0.5">7</h3>
            <p className="text-[11px] text-amber-600 font-semibold mt-1 truncate">
              3 due review
            </p>
          </div>
        </div>

        {/* 5. On Leave */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-3 hover:shadow-md transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Calendar size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">
              On Leave
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-0.5">4</h3>
            <p className="text-[11px] text-slate-500 font-semibold mt-1 truncate">
              Today (Nov 17)
            </p>
          </div>
        </div>

        {/* 6. Today's Attendance */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-3 hover:shadow-md transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <BarChart2 size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">
              Checked In
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-0.5">
              76<span className="text-sm font-normal text-slate-400">/82</span>
            </h3>
            <p className="text-[11px] text-purple-600 font-semibold mt-1 truncate">
              6 pending check-in
            </p>
          </div>
        </div>

        {/* 7. Attendance % */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-3 hover:shadow-md transition-shadow">
          <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <TrendingUp size={20} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate">
              Attendance %
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-0.5">92.7%</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 truncate">
              ↑ 1.2% target met
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Department-wise Employee Distribution (PieChart) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Department-wise Employee Distribution
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Total: 87 team members across 7 departments</p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
              7 Teams
            </span>
          </div>

          <div className="mt-4">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={deptDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {deptDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val} Employees (${((val / 87) * 100).toFixed(1)}%)`, name]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Department Legend Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-xs">
            {deptDistributionData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-slate-600 truncate">{d.name}:</span>
                <span className="font-bold font-mono text-slate-800">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Monthly Attendance % trend (AreaChart) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Monthly Attendance Trend (Last 12 Months)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Average company attendance % ranging 88% - 96%</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <TrendingUp size={12} /> Target: 90%+
              </span>
            </div>
          </div>

          <div className="mt-4">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyAttendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[80, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  formatter={(val) => [`${val}%`, "Attendance Rate"]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#attendanceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
            <span>Highest: <strong className="text-slate-800 font-mono">96.0% (Oct 26)</strong></span>
            <span>Lowest: <strong className="text-slate-800 font-mono">88.4% (Feb 26)</strong></span>
            <span>Current: <strong className="text-indigo-600 font-mono">92.7% (Nov 26)</strong></span>
          </div>
        </div>
      </div>

      {/* Row 3: 2 Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Employee Turnover Rate chart (LineChart) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Employee Turnover Rate
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">12 months retention & exits (1-4 exits/month)</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Low Turnover (2.2% avg)
            </span>
          </div>

          <div className="mt-4">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={turnoverData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 6]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                <Line
                  type="monotone"
                  dataKey="resigned"
                  name="Exits"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="joined"
                  name="Joiners"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
            <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <p className="text-emerald-700 font-medium">Total Joined (12M)</p>
              <p className="text-base font-bold font-mono text-emerald-800 mt-0.5">+47 Staff</p>
            </div>
            <div className="p-2.5 bg-rose-50/60 rounded-xl border border-rose-100">
              <p className="text-rose-700 font-medium">Total Exits (12M)</p>
              <p className="text-base font-bold font-mono text-rose-800 mt-0.5">-26 Staff</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Pending Leave Requests Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Pending Leave Requests
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">8 leave applications in queue</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
              4 Pending Review
            </span>
          </div>

          <div className="p-5 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pr-2">Employee</th>
                  <th className="pb-3 px-2">Dept</th>
                  <th className="pb-3 px-2">Type</th>
                  <th className="pb-3 px-2">Duration</th>
                  <th className="pb-3 px-2">Days</th>
                  <th className="pb-3 pl-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {leaveRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {req.avatar}
                        </div>
                        <span className="font-semibold text-slate-800 whitespace-nowrap">
                          {req.employee}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-slate-600 whitespace-nowrap">{req.department}</td>
                    <td className="py-3 px-2 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                          req.type === "Casual"
                            ? "bg-blue-50 text-blue-700"
                            : req.type === "Sick"
                            ? "bg-amber-50 text-amber-700"
                            : req.type === "Maternity"
                            ? "bg-purple-50 text-purple-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {req.type}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {req.from} - {req.to}
                    </td>
                    <td className="py-3 px-2 font-mono font-bold text-slate-800 whitespace-nowrap">
                      {req.days}d
                    </td>
                    <td className="py-3 pl-2 text-right whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          req.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : req.status === "Rejected"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 4: Department-wise Employee Distribution Table (full width) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Department-wise Headcount & Attendance Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive overview of staff allocation, leadership, and attendance averages
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            Updated today
          </span>
        </div>

        <div className="p-5 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3.5 pr-4">Department</th>
                <th className="pb-3.5 px-4">Department Head</th>
                <th className="pb-3.5 px-4 text-center">Total Staff</th>
                <th className="pb-3.5 px-4 text-center">Active</th>
                <th className="pb-3.5 px-4 text-center">On Leave</th>
                <th className="pb-3.5 pl-4 text-right">Avg Attendance %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {deptTableData.map((row) => (
                <tr key={row.department} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 pr-4">
                    <div className={`pl-3 border-l-4 ${row.color}`}>
                      <span className="font-bold text-slate-900">{row.department}</span>
                      <p className="text-[11px] text-slate-400">NoteSwift Core Unit</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    {row.head}
                  </td>
                  <td className="py-4 px-4 text-center font-bold font-mono text-slate-800">
                    {row.total}
                  </td>
                  <td className="py-4 px-4 text-center font-bold font-mono text-emerald-600">
                    {row.active}
                  </td>
                  <td className="py-4 px-4 text-center font-bold font-mono text-rose-500">
                    {row.onLeave}
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-20 bg-slate-100 rounded-full h-1.5 hidden sm:block">
                        <div
                          className="bg-indigo-600 h-1.5 rounded-full"
                          style={{ width: row.avgAttendance }}
                        />
                      </div>
                      <span className="font-mono font-bold text-slate-900">
                        {row.avgAttendance}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HROverview;
