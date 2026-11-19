import { useState } from "react";
import {
  Target,
  TrendingUp,
  Flag,
  CheckCircle2,
  Clock,
  Star,
  Zap,
  Award,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const StrategicGoals = () => {
  // Monthly Targets vs Actuals - 8 months Apr-Nov
  const monthlyTargets = [
    {
      month: "Apr 2026",
      revTarget: 3000000,
      revActual: 3150000,
      studentsTarget: 250,
      studentsActual: 270,
      status: "Achieved",
    },
    {
      month: "May 2026",
      revTarget: 3500000,
      revActual: 3600000,
      studentsTarget: 300,
      studentsActual: 325,
      status: "Achieved",
    },
    {
      month: "Jun 2026",
      revTarget: 4000000,
      revActual: 3950000,
      studentsTarget: 350,
      studentsActual: 340,
      status: "Near Target",
    },
    {
      month: "Jul 2026",
      revTarget: 4200000,
      revActual: 4350000,
      studentsTarget: 400,
      studentsActual: 420,
      status: "Achieved",
    },
    {
      month: "Aug 2026",
      revTarget: 4500000,
      revActual: 4600000,
      studentsTarget: 450,
      studentsActual: 480,
      status: "Achieved",
    },
    {
      month: "Sep 2026",
      revTarget: 4500000,
      revActual: 4400000,
      studentsTarget: 450,
      studentsActual: 435,
      status: "Near Target",
    },
    {
      month: "Oct 2026",
      revTarget: 4800000,
      revActual: 4950000,
      studentsTarget: 500,
      studentsActual: 512,
      status: "Achieved",
    },
    {
      month: "Nov 2026",
      revTarget: 4500000,
      revActual: 3400000,
      studentsTarget: 450,
      studentsActual: 365,
      status: "In Progress",
    },
  ];

  // Department-wise Targets table - 7 departments
  const departmentTargets = [
    {
      dept: "Academics",
      annualTarget: "50 Live Courses",
      achieved: "34 Courses",
      progress: 68,
      status: "On Track",
      color: "bg-cyan-500",
    },
    {
      dept: "Sales & Growth",
      annualTarget: "₹ 5.00 Cr Revenue",
      achieved: "₹ 3.24 Cr",
      progress: 64.9,
      status: "On Track",
      color: "bg-emerald-500",
    },
    {
      dept: "Technology",
      annualTarget: "99.9% Uptime & LMS v3",
      achieved: "99.6% / 80% Dev",
      progress: 88,
      status: "Ahead",
      color: "bg-indigo-500",
    },
    {
      dept: "Marketing",
      annualTarget: "10,000 Inbound Leads",
      achieved: "7,840 Leads",
      progress: 78.4,
      status: "On Track",
      color: "bg-pink-500",
    },
    {
      dept: "Human Resources",
      annualTarget: "100 Quality Hires",
      achieved: "87 Headcount",
      progress: 87,
      status: "Ahead",
      color: "bg-violet-500",
    },
    {
      dept: "Operations",
      annualTarget: "95% Asset Utilization",
      achieved: "94.8% SLA",
      progress: 94.8,
      status: "On Track",
      color: "bg-amber-500",
    },
    {
      dept: "Finance",
      annualTarget: "Operating Margin > 35%",
      achieved: "38.2% Margin",
      progress: 96,
      status: "Ahead",
      color: "bg-emerald-600",
    },
  ];

  // Strategic Milestones Timeline - 10 milestones chronologically Apr 2026 - Mar 2027
  const milestones = [
    {
      date: "Apr 2026",
      title: "Company Founded & Incorporation",
      desc: "NoteSwift EdTech Pvt. Ltd. officially registered with seed capital.",
      status: "completed",
    },
    {
      date: "May 2026",
      title: "First 500 Students Enrolled",
      desc: "Achieved product-market fit across 3 pilot technology courses.",
      status: "completed",
    },
    {
      date: "Jun 2026",
      title: "10 Courses Live in Catalog",
      desc: "Launched enterprise curriculum with live mentorship classes.",
      status: "completed",
    },
    {
      date: "Jul 2026",
      title: "₹50L Monthly Revenue Milestone",
      desc: "First monthly operational break-even achieved with positive cash flow.",
      status: "completed",
    },
    {
      date: "Sep 2026",
      title: "Tech Platform v2.0 Launch",
      desc: "Migrated to AWS microservices architecture with interactive IDE.",
      status: "completed",
    },
    {
      date: "Nov 2026",
      title: "2,500 Student Mark",
      desc: "Currently at 2,847 total students enrolled across all cohorts.",
      status: "in-progress",
    },
    {
      date: "Dec 2026",
      title: "Partnership with 5 Corporates",
      desc: "In active negotiation with TCS, Infosys and Wipro for hiring pipeline.",
      status: "in-progress",
    },
    {
      date: "Jan 2027",
      title: "International Expansion",
      desc: "Entry into Southeast Asia and Middle East EdTech markets.",
      status: "planned",
    },
    {
      date: "Feb 2027",
      title: "50 Course Comprehensive Portfolio",
      desc: "Launch Data Science, AI/ML, DevOps and Cloud Architecture tracks.",
      status: "planned",
    },
    {
      date: "Mar 2027",
      title: "₹5Cr Annual Revenue Target",
      desc: "Reach fiscal year goal with 35%+ audited EBITDA profitability.",
      status: "planned",
    },
  ];

  // Radial Progress Ring Helper
  const CircularProgress = ({ percentage, color, label, subtext }) => {
    const radius = 56;
    const circumference = 2 * Math.PI * radius; // ~351.85
    const strokeDashoffset = circumference * (1 - percentage / 100);

    return (
      <div className="flex flex-col items-center justify-center p-6 bg-slate-50/60 rounded-2xl border border-slate-100">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#e2e8f0"
              strokeWidth="14"
              fill="transparent"
            />
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke={color}
              strokeWidth="14"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-extrabold font-mono text-slate-900">
              {percentage}%
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Achieved
            </span>
          </div>
        </div>
        <h4 className="text-sm font-bold text-slate-800 mt-3">{label}</h4>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{subtext}</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Strategic Goals & Objectives
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              FY 2026-27 Vision
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Annual OKRs, corporate milestones timeline, targets vs actuals, and department progress
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs">
          <Target size={14} className="text-indigo-600" />
          <span>Annual Goal Completion: <strong>73.0%</strong></span>
        </div>
      </div>

      {/* Row 1: Annual Goals Progress Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Revenue Target */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Revenue Target
              </span>
              <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp size={16} />
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-bold font-mono text-slate-900">
                ₹ 3.24 Cr
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                Annual Target: ₹ 5.00 Cr
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-emerald-700">64.9% Achieved</span>
              <span className="text-slate-400 font-mono">₹ 1.76 Cr rem.</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "64.9%" }} />
            </div>
          </div>
        </div>

        {/* 2. Student Enrollment Target */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Student Enrollment
              </span>
              <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Target size={16} />
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-bold font-mono text-slate-900">
                2,847
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                Target: 3,500 Learners
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-indigo-700">81.3% Achieved</span>
              <span className="text-slate-400 font-mono">653 remaining</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "81.3%" }} />
            </div>
          </div>
        </div>

        {/* 3. Course Launch Target */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Course Catalog
              </span>
              <span className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Star size={16} />
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-bold font-mono text-slate-900">
                34 Live
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                Target: 50 Courses
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-cyan-700">68.0% Achieved</span>
              <span className="text-slate-400 font-mono">16 upcoming</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "68%" }} />
            </div>
          </div>
        </div>

        {/* 4. Employee Target */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Headcount Goal
              </span>
              <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Award size={16} />
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-bold font-mono text-slate-900">
                87 Staff
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                Target: 100 Employees
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-purple-700">87.0% Achieved</span>
              <span className="text-slate-400 font-mono">13 to hire</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-violet-500 h-2 rounded-full" style={{ width: "87%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: 2 Panels (Monthly Targets vs Actuals & Department-wise Targets) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Monthly Targets vs Actuals table (8 months Apr-Nov) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Monthly Targets vs Actuals (Apr - Nov 2026)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Financial & student acquisition performance</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              6 of 8 Achieved
            </span>
          </div>

          <div className="p-5 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pr-2">Month</th>
                  <th className="pb-3 px-2">Rev Target</th>
                  <th className="pb-3 px-2">Rev Actual</th>
                  <th className="pb-3 px-2">Students Target</th>
                  <th className="pb-3 px-2">Students Actual</th>
                  <th className="pb-3 pl-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {monthlyTargets.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 pr-2 font-semibold text-slate-800 whitespace-nowrap">
                      {row.month}
                    </td>
                    <td className="py-3 px-2 font-mono text-slate-500 whitespace-nowrap">
                      ₹ {(row.revTarget / 100000).toFixed(1)}L
                    </td>
                    <td className="py-3 px-2 font-mono font-bold text-slate-900 whitespace-nowrap">
                      ₹ {(row.revActual / 100000).toFixed(1)}L
                    </td>
                    <td className="py-3 px-2 font-mono text-slate-500 whitespace-nowrap">
                      {row.studentsTarget}
                    </td>
                    <td className="py-3 px-2 font-mono font-bold text-indigo-600 whitespace-nowrap">
                      {row.studentsActual}
                    </td>
                    <td className="py-3 pl-2 text-right whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          row.status === "Achieved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : row.status === "Near Target"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Department-wise Targets Table (7 departments) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Department OKRs & Progress
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">7 core divisions annual scorecards</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200">
              Q3 Mid-Term
            </span>
          </div>

          <div className="p-5 space-y-4">
            {departmentTargets.map((d) => (
              <div key={d.dept} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{d.dept}</span>
                    <span className="text-[11px] text-slate-400">• {d.annualTarget}</span>
                  </div>
                  <span
                    className={`px-2 py-0.2 rounded-full text-[10px] font-bold border ${
                      d.status === "Ahead"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className={`${d.color} h-2 rounded-full`} style={{ width: `${Math.min(100, d.progress)}%` }} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Achieved: <strong>{d.achieved}</strong></span>
                  <span>{d.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Strategic Milestones Timeline (Vertical Timeline) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Strategic Milestones Roadmap (Apr 2026 - Mar 2027)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              10 company-wide inflection points and executive objectives
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Completed (5)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-700">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> In Progress (2)
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Planned (3)
            </span>
          </div>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-6 ml-3 my-2">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker icon/bullet */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-xs ${
                  m.status === "completed"
                    ? "bg-emerald-500 text-white"
                    : m.status === "in-progress"
                    ? "bg-indigo-600 text-white animate-pulse"
                    : "bg-slate-300 text-white"
                }`}
              >
                {m.status === "completed" ? (
                  <CheckCircle2 size={13} />
                ) : m.status === "in-progress" ? (
                  <Clock size={12} />
                ) : (
                  <Sparkles size={11} />
                )}
              </div>

              {/* Milestone Box */}
              <div
                className={`p-4 rounded-xl border transition ${
                  m.status === "completed"
                    ? "bg-emerald-50/40 border-emerald-100 hover:bg-emerald-50/70"
                    : m.status === "in-progress"
                    ? "bg-indigo-50/40 border-indigo-200 hover:bg-indigo-50/70"
                    : "bg-slate-50/60 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                        m.status === "completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : m.status === "in-progress"
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {m.date}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {m.title}
                    </h4>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border self-start sm:self-auto ${
                      m.status === "completed"
                        ? "bg-emerald-100/70 text-emerald-800 border-emerald-300"
                        : m.status === "in-progress"
                        ? "bg-indigo-100/70 text-indigo-800 border-indigo-300"
                        : "bg-slate-100 text-slate-600 border-slate-300"
                    }`}
                  >
                    {m.status === "completed"
                      ? "Completed ✅"
                      : m.status === "in-progress"
                      ? "In Progress 🔵"
                      : "Planned 🔮"}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 4: Goal Completion Summary (3 SVG Progress Rings) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Goal Completion Summary (Executive Radials)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              High-level index across all strategic commitments for FY 2026-27
            </p>
          </div>
          <span className="text-xs font-bold font-mono text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
            NoteSwift Index
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CircularProgress
            percentage={73.0}
            color="#6366f1"
            label="Overall Company Goals"
            subtext="Calculated across 28 key operational OKRs"
          />
          <CircularProgress
            percentage={64.9}
            color="#22c55e"
            label="Revenue Target Realization"
            subtext="₹ 3.24 Cr achieved of ₹ 5.00 Cr target"
          />
          <CircularProgress
            percentage={81.3}
            color="#06b6d4"
            label="Student Enrollment Fulfillment"
            subtext="2,847 learners enrolled of 3,500 target"
          />
        </div>
      </div>
    </div>
  );
};

export default StrategicGoals;
