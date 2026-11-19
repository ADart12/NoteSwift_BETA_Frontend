import { useState } from "react";
import {
  Code2,
  CheckCircle2,
  AlertTriangle,
  Bug,
  Server,
  Database,
  Globe,
  Wifi,
  Clock,
  Layers,
  Activity,
  Cpu,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TechnologyOverview = () => {
  // Monthly Project Completion Rate & Delivery velocity
  const projectVelocityData = [
    { month: "Jun", completed: 3, inProgress: 6, delayed: 1 },
    { month: "Jul", completed: 4, inProgress: 7, delayed: 0 },
    { month: "Aug", completed: 5, inProgress: 6, delayed: 1 },
    { month: "Sep", completed: 4, inProgress: 8, delayed: 2 },
    { month: "Oct", completed: 5, inProgress: 7, delayed: 1 },
    { month: "Nov", completed: 3, inProgress: 8, delayed: 2 },
  ];

  // Tech Issues by Category (PieChart):
  // Bug Fix 35%, Feature Request 28%, Infrastructure 18%, Security 12%, Performance 7%
  const issueCategoryData = [
    { name: "Bug Fix", value: 35, color: "#ef4444" },
    { name: "Feature Request", value: 28, color: "#6366f1" },
    { name: "Infrastructure", value: 18, color: "#06b6d4" },
    { name: "Security", value: 12, color: "#f59e0b" },
    { name: "Performance", value: 7, color: "#a855f7" },
  ];

  // Infrastructure Status - 4 cards
  const infraStatus = [
    {
      name: "Web Application Server (AWS ECS)",
      status: "Online",
      uptime: "99.9%",
      responseTime: "42ms",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: Server,
      iconBg: "bg-emerald-50 text-emerald-600",
      details: "Cluster Healthy • 8 Nodes Active",
    },
    {
      name: "PostgreSQL Database (RDS Aurora)",
      status: "Online",
      uptime: "99.7%",
      responseTime: "18ms",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: Database,
      iconBg: "bg-emerald-50 text-emerald-600",
      details: "Read Replicas Synchronized • 0 Deadlocks",
    },
    {
      name: "Cloudflare Edge CDN & DNS",
      status: "Degraded",
      uptime: "97.2%",
      responseTime: "128ms",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Globe,
      iconBg: "bg-amber-50 text-amber-600",
      details: "South Asia POP Latency Spike Under Review",
    },
    {
      name: "Email & Notification Gateway",
      status: "Online",
      uptime: "99.4%",
      responseTime: "85ms",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: Wifi,
      iconBg: "bg-emerald-50 text-emerald-600",
      details: "SendGrid / SES Webhooks 100% Delivered",
    },
  ];

  // Active Projects table - 8 rows
  // (Project, Lead, Priority, Sprint, Tasks Done/Total, Status)
  const activeProjects = [
    {
      id: "TP-01",
      project: "LMS Platform 3.0 Architecture",
      lead: "Karthik Verma",
      priority: "High",
      sprint: "Sprint 42",
      done: 64,
      total: 78,
      status: "In Progress",
    },
    {
      id: "TP-02",
      project: "Mobile App Offline Sync Engine",
      lead: "Rohan Kapoor",
      priority: "High",
      sprint: "Sprint 14",
      done: 38,
      total: 50,
      status: "In Progress",
    },
    {
      id: "TP-03",
      project: "AI Automated Video Transcription",
      lead: "Priya Sharma",
      priority: "Medium",
      sprint: "Sprint 08",
      done: 42,
      total: 45,
      status: "In Review",
    },
    {
      id: "TP-04",
      project: "Payment Gateway Multi-Routing (Razorpay/Stripe)",
      lead: "Sameer Joshi",
      priority: "High",
      sprint: "Sprint 22",
      done: 22,
      total: 40,
      status: "Delayed",
    },
    {
      id: "TP-05",
      project: "Real-time Attendance Biometric Sync",
      lead: "Divya Menon",
      priority: "Medium",
      sprint: "Sprint 19",
      done: 30,
      total: 35,
      status: "In Progress",
    },
    {
      id: "TP-06",
      project: "Student Interactive Quiz Module",
      lead: "Aarav Sharma",
      priority: "Low",
      sprint: "Sprint 11",
      done: 18,
      total: 20,
      status: "Testing",
    },
    {
      id: "TP-07",
      project: "SOC-2 Type II Compliance Hardening",
      lead: "Neha Singhal",
      priority: "High",
      sprint: "Sprint 05",
      done: 12,
      total: 32,
      status: "Delayed",
    },
    {
      id: "TP-08",
      project: "Faculty Assessment Analytics Dashboard",
      lead: "Aditya Roy",
      priority: "Low",
      sprint: "Sprint 09",
      done: 25,
      total: 28,
      status: "In Progress",
    },
  ];

  // Technology Issues / Ticket list - 10 items
  // Title, Priority, Assigned, Status, Created
  // Priorities: Critical (red), High (orange), Medium (amber), Low (green)
  const techTickets = [
    {
      id: "TICK-801",
      title: "CDN SSL Handshake Timeout in Delhi Edge POP",
      priority: "Critical",
      assigned: "Infrastructure Team",
      status: "Investigating",
      created: "25 mins ago",
    },
    {
      id: "TICK-802",
      title: "Payment Webhook signature mismatch on Retry",
      priority: "Critical",
      assigned: "Sameer Joshi",
      status: "In Progress",
      created: "1 hour ago",
    },
    {
      id: "TICK-803",
      title: "PostgreSQL slow query on student enrollments table",
      priority: "High",
      assigned: "Karthik Verma",
      status: "Under Review",
      created: "3 hours ago",
    },
    {
      id: "TICK-804",
      title: "Live session audio latency on WebRTC fallback",
      priority: "High",
      assigned: "Rohan Kapoor",
      status: "In Progress",
      created: "5 hours ago",
    },
    {
      id: "TICK-805",
      title: "Mobile App crash on Android 14 background resume",
      priority: "High",
      assigned: "Divya Menon",
      status: "Patch Ready",
      created: "7 hours ago",
    },
    {
      id: "TICK-806",
      title: "Course video player fullscreen icon alignment",
      priority: "Medium",
      assigned: "Aarav Sharma",
      status: "In Progress",
      created: "1 day ago",
    },
    {
      id: "TICK-807",
      title: "Teacher dashboard quiz submission CSV export timeout",
      priority: "Medium",
      assigned: "Aditya Roy",
      status: "Assigned",
      created: "1 day ago",
    },
    {
      id: "TICK-808",
      title: "Automated daily S3 backup notification alert missing",
      priority: "Medium",
      assigned: "DevOps Bot",
      status: "Assigned",
      created: "2 days ago",
    },
    {
      id: "TICK-809",
      title: "Fix typo on FAQ checkout pricing card",
      priority: "Low",
      assigned: "Frontend Team",
      status: "Resolved",
      created: "2 days ago",
    },
    {
      id: "TICK-810",
      title: "Upgrade TailwindCSS plugins & Vite build cache",
      priority: "Low",
      assigned: "Aarav Sharma",
      status: "In Backlog",
      created: "3 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Technology Overview (CTO)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              NoteSwift Tech Stack v2.4
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Product engineering velocity, cloud infrastructure telemetry, sprint delivery, and bug triage
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs">
          <Activity size={14} className="text-emerald-500" />
          <span>System Health: <strong>99.6% Avg</strong></span>
        </div>
      </div>

      {/* Row 1: 5 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Active Projects */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Layers size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Active Projects
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">8</h3>
            <p className="text-[11px] text-indigo-600 font-semibold mt-1">
              Across 3 Squads
            </p>
          </div>
        </div>

        {/* 2. Completed Projects */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Completed FY
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">24</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              Delivered on SLA
            </p>
          </div>
        </div>

        {/* 3. Delayed Projects */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Delayed Projects
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">2</h3>
            <p className="text-[11px] text-rose-600 font-semibold mt-1">
              Needs Attention
            </p>
          </div>
        </div>

        {/* 4. Critical Tasks */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Bug size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Critical Tasks
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">7</h3>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">
              Overdue in sprint
            </p>
          </div>
        </div>

        {/* 5. Pending Tasks */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-3.5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <Code2 size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Pending Tasks
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">48</h3>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">
              Sprint backlog total
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Project Delivery & Completion Rate (BarChart) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Project Delivery Velocity (Jun - Nov 2026)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Completed, in-progress, and blocked/delayed initiatives per month
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                85% On-Time Delivery
              </span>
            </div>
          </div>

          <div className="mt-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={projectVelocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                <Bar dataKey="completed" name="Completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inProgress" name="In Progress" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delayed" name="Delayed" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
            <span>Peak Month: <strong className="text-slate-800 font-mono">Aug (5 Delivered)</strong></span>
            <span>Current In-Flight: <strong className="text-indigo-600 font-mono">8 Projects</strong></span>
            <span>Sprint Cadence: <strong className="text-slate-800 font-mono">2-week sprints</strong></span>
          </div>
        </div>

        {/* RIGHT: Tech Issues by Category (PieChart) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Tech Issues by Category
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Distribution across 124 tickets this month</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
              100% Breakdown
            </span>
          </div>

          <div className="mt-4">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={issueCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {issueCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val}% of total issues`, name]}
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

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-xs">
            {issueCategoryData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 truncate">{item.name}:</span>
                <span className="font-bold font-mono text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Infrastructure Status Grid (2x2 grid) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Cloud Infrastructure & Service Health
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live uptime monitoring, latency benchmarks, and operational degradation alerts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500">
              Global SLA: <strong className="text-slate-800 font-mono">99.5%</strong>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {infraStatus.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.name}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition flex items-start gap-4"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  <IconComponent size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-800 truncate">
                      {item.name}
                    </h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border shrink-0 ${item.badgeColor}`}>
                      {item.status === "Online" ? "Online ✅" : "Degraded ⚠️"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <div>
                      <span className="text-slate-400 font-medium">Uptime: </span>
                      <strong className="font-mono text-slate-800">{item.uptime}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Latency: </span>
                      <strong className="font-mono text-slate-800">{item.responseTime}</strong>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 truncate">
                    {item.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 4: 2 Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Active Projects table - 8 rows */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Active Engineering Projects (8)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Sprint progress & task burndown</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
              Sprint Cycle 42
            </span>
          </div>

          <div className="p-5 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pr-2">Project</th>
                  <th className="pb-3 px-2">Lead</th>
                  <th className="pb-3 px-2">Priority</th>
                  <th className="pb-3 px-2">Tasks Done</th>
                  <th className="pb-3 pl-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {activeProjects.map((p) => {
                  const pct = Math.round((p.done / p.total) * 100);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 pr-2">
                        <span className="font-bold text-slate-800 block truncate max-w-[200px]" title={p.project}>
                          {p.project}
                        </span>
                        <span className="text-[11px] text-slate-400">{p.sprint}</span>
                      </td>
                      <td className="py-3 px-2 font-medium text-slate-700 whitespace-nowrap">
                        {p.lead}
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            p.priority === "High"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : p.priority === "Medium"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {p.priority}
                        </span>
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 rounded-full h-1.5">
                            <div
                              className="bg-indigo-600 h-1.5 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="font-mono text-slate-700 font-semibold text-[11px]">
                            {p.done}/{p.total}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pl-2 text-right whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            p.status === "Delayed"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : p.status === "In Review" || p.status === "Testing"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Technology Issues / Ticket list - 10 items */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Technology Tickets & Bugs (10)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Real-time incident response board</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full border border-rose-200">
              2 Critical
            </span>
          </div>

          <div className="p-5 max-h-[420px] overflow-y-auto space-y-2.5">
            {techTickets.map((t) => (
              <div
                key={t.id}
                className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-100 transition flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider ${
                        t.priority === "Critical"
                          ? "bg-red-500 text-white"
                          : t.priority === "High"
                          ? "bg-orange-500 text-white"
                          : t.priority === "Medium"
                          ? "bg-amber-500 text-white"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      {t.priority}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{t.id}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-1 truncate">
                    {t.title}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Assigned: <span className="font-semibold text-slate-700">{t.assigned}</span> • {t.status}
                  </p>
                </div>

                <span className="text-[10px] text-slate-400 font-medium shrink-0 whitespace-nowrap mt-1">
                  {t.created}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Mean Time to Resolve: <strong>3.4 hrs</strong></span>
            <button className="text-indigo-600 font-bold hover:text-indigo-700 cursor-pointer flex items-center gap-1">
              <span>Jira Workspace</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyOverview;
