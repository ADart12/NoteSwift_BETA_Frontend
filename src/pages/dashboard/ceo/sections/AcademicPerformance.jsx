import React from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Star,
  Clock,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AcademicPerformance = () => {
  // Course-wise enrollments (Top 8 courses, range 85 - 310)
  const courseEnrollments = [
    { course: "Full Stack Dev", enrollments: 310 },
    { course: "Data Science", enrollments: 285 },
    { course: "Cloud Computing", enrollments: 230 },
    { course: "Cybersecurity", enrollments: 195 },
    { course: "Python Basics", enrollments: 175 },
    { course: "UI/UX Design", enrollments: 150 },
    { course: "Business Analytics", enrollments: 125 },
    { course: "Digital Marketing", enrollments: 95 },
  ];

  // 12-month Enrollment Growth
  const enrollmentGrowthData = [
    { month: "Apr", newStudents: 180 },
    { month: "May", newStudents: 210 },
    { month: "Jun", newStudents: 235 },
    { month: "Jul", newStudents: 280 },
    { month: "Aug", newStudents: 295 },
    { month: "Sep", newStudents: 330 },
    { month: "Oct", newStudents: 360 },
    { month: "Nov", newStudents: 385 },
    { month: "Dec", newStudents: 395 },
    { month: "Jan", newStudents: 410 },
    { month: "Feb", newStudents: 415 },
    { month: "Mar", newStudents: 430 },
  ];

  // Student Completion Rate Donut
  const completionData = [
    { name: "Completed", value: 68, color: "#22c55e" },
    { name: "In Progress", value: 22, color: "#6366f1" },
    { name: "Dropped", value: 10, color: "#ef4444" },
  ];

  // Top Performing Courses
  const topCourses = [
    {
      course: "Full Stack Web Development",
      instructor: "Dr. Arvind Rao",
      enrolled: 310,
      completionRate: "88.5%",
      rating: 4.9,
    },
    {
      course: "Data Science & AI Bootcamp",
      instructor: "Sunita Iyer",
      enrolled: 285,
      completionRate: "84.2%",
      rating: 4.8,
    },
    {
      course: "Cloud Architecture & DevOps",
      instructor: "Manish Kapoor",
      enrolled: 230,
      completionRate: "81.0%",
      rating: 4.7,
    },
    {
      course: "Enterprise Cybersecurity",
      instructor: "Rajesh Khanna",
      enrolled: 195,
      completionRate: "79.4%",
      rating: 4.8,
    },
    {
      course: "UI/UX Product Design Masterclass",
      instructor: "Neha Sen",
      enrolled: 150,
      completionRate: "91.2%",
      rating: 4.9,
    },
  ];

  // Cohort Performance Data (6 cohorts mix of Ongoing / Completed)
  const cohortData = [
    {
      name: "Cohort Alpha 2026 (Full Stack)",
      startDate: "15 Jul 2026",
      students: 65,
      completed: 59,
      status: "Completed",
    },
    {
      name: "Cohort Beta 2026 (Data Science)",
      startDate: "01 Aug 2026",
      students: 58,
      completed: 51,
      status: "Completed",
    },
    {
      name: "Cohort Gamma 2026 (DevOps)",
      startDate: "15 Aug 2026",
      students: 50,
      completed: 44,
      status: "Completed",
    },
    {
      name: "Cohort Delta 2026 (Full Stack)",
      startDate: "15 Sep 2026",
      students: 72,
      completed: 0,
      status: "Ongoing",
    },
    {
      name: "Cohort Epsilon 2026 (Cybersecurity)",
      startDate: "01 Oct 2026",
      students: 45,
      completed: 0,
      status: "Ongoing",
    },
    {
      name: "Cohort Zeta 2026 (UI/UX Design)",
      startDate: "15 Oct 2026",
      students: 60,
      completed: 0,
      status: "Ongoing",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Academic Performance (CAO)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Curriculum efficacy, student enrollment metrics & cohort success
            rates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
            <Sparkles size={14} />
            Academic Dean: Priya Sharma
          </span>
        </div>
      </div>

      {/* Row 1: 6 KPI Cards (2 rows of 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Total Students */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <GraduationCap size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Students
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              2,847
            </h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <ArrowUpRight size={14} />
              <span>↑ 124 this month</span>
            </p>
          </div>
        </div>

        {/* Card 2: Active Students */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Users size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Active Students
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              2,341
            </h3>
            <p className="text-xs text-indigo-600 font-semibold mt-1">
              82.3% active engagement
            </p>
          </div>
        </div>

        {/* Card 3: Total Enrollments */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Enrollments
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              3,891
            </h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              FY 2026-27 Cumulative
            </p>
          </div>
        </div>

        {/* Card 4: Active Courses */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
            <BookOpen size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Active Courses
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              34
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Across 5 Tech domains
            </p>
          </div>
        </div>

        {/* Card 5: Upcoming Courses */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Calendar size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Upcoming Courses
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              8
            </h3>
            <p className="text-xs text-amber-600 font-semibold mt-1">
              Launching in Q4
            </p>
          </div>
        </div>

        {/* Card 6: Ongoing Cohorts */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Ongoing Cohorts
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              12
            </h3>
            <p className="text-xs text-teal-600 font-semibold mt-1">
              Live interactive batches
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: 2 Charts Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Course-wise Enrollments (Horizontal BarChart) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Course-wise Enrollments
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Top 8 courses by student registration
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
              Top 8 Tracks
            </span>
          </div>
          <div className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                layout="vertical"
                data={courseEnrollments}
                margin={{ top: 5, right: 20, left: 25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="course"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  width={110}
                />
                <Tooltip
                  formatter={(val) => [`${val} Students`, "Enrolled"]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="enrollments" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: Enrollment Growth (AreaChart) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Enrollment Growth
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Monthly student onboarding trend (12 Months)
              </p>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
              <TrendingUp size={13} />
              +138% FY Growth
            </span>
          </div>
          <div className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={enrollmentGrowthData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="enrollmentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(val) => [`${val} Admissions`, "New Students"]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="newStudents"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#enrollmentGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: 2 Panels (Top Performing Courses & Cohort Performance) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Top Performing Courses Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">
              Top Performing Courses
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              High student completion & instructor ratings
            </p>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pr-2">Course</th>
                    <th className="pb-3 px-2">Instructor</th>
                    <th className="pb-3 px-2 text-center">Enrolled</th>
                    <th className="pb-3 px-2 text-center">Completion</th>
                    <th className="pb-3 pl-2 text-right">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {topCourses.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 pr-2 font-semibold text-slate-800">
                        {c.course}
                      </td>
                      <td className="py-3 px-2 text-slate-500">{c.instructor}</td>
                      <td className="py-3 px-2 text-center font-mono font-semibold text-slate-800">
                        {c.enrolled}
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-emerald-600">
                        {c.completionRate}
                      </td>
                      <td className="py-3 pl-2 text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold text-[11px] bg-amber-50 text-amber-700 border border-amber-200">
                          <Star size={11} className="fill-amber-500 text-amber-500" />
                          {c.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT: Cohort Performance Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">
              Cohort Performance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live and graduated student cohorts
            </p>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pr-2">Cohort Name</th>
                    <th className="pb-3 px-2">Start Date</th>
                    <th className="pb-3 px-2 text-center">Students</th>
                    <th className="pb-3 px-2 text-center">Completed</th>
                    <th className="pb-3 pl-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {cohortData.map((cohort, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 pr-2 font-semibold text-slate-800">
                        {cohort.name}
                      </td>
                      <td className="py-3 px-2 text-slate-500 font-mono">
                        {cohort.startDate}
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-semibold text-slate-800">
                        {cohort.students}
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-slate-600">
                        {cohort.completed > 0 ? cohort.completed : "-"}
                      </td>
                      <td className="py-3 pl-2 text-right">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            cohort.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                          }`}
                        >
                          {cohort.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Student Completion Rate Donut (PieChart) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Student Completion Rate & Retention Analysis
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Overall academic retention lifecycle across 2,847 total students
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              90% Overall Retention Rate
            </span>
          </div>
        </div>

        <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Donut Chart */}
          <div className="md:col-span-5 flex justify-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Tooltip
                  formatter={(val, name) => [`${val}%`, name]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Pie
                  data={completionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown cards & metrics */}
          <div className="md:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-800">
                    Completed
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <h4 className="text-2xl font-bold font-mono text-emerald-950 mt-1">
                  68%
                </h4>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  1,935 Students certified
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-800">
                    In Progress
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                </div>
                <h4 className="text-2xl font-bold font-mono text-indigo-950 mt-1">
                  22%
                </h4>
                <p className="text-[11px] text-indigo-700 mt-0.5">
                  626 Active learners
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-800">
                    Dropped
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                </div>
                <h4 className="text-2xl font-bold font-mono text-rose-950 mt-1">
                  10%
                </h4>
                <p className="text-[11px] text-rose-700 mt-0.5">
                  286 Students dropped
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span className="text-slate-600 font-medium">
                  Average completion timeline:{" "}
                  <strong className="text-slate-800 font-mono">14.2 weeks</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-indigo-500" />
                <span className="text-slate-600 font-medium">
                  Certificate pass rate:{" "}
                  <strong className="text-slate-800 font-mono">92.4%</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicPerformance;
