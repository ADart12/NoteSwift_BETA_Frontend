import React from "react";
import {
  Target,
  TrendingUp,
  Trophy,
  XCircle,
  Percent,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Award,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesPerformance = () => {
  // Monthly Sales Growth (Apr-Mar) 12L - 28L
  const monthlySalesData = [
    { month: "Apr", sales: 1420000 },
    { month: "May", sales: 1580000 },
    { month: "Jun", sales: 1510000 },
    { month: "Jul", revenue: 1740000, sales: 1740000 },
    { month: "Aug", sales: 1890000 },
    { month: "Sep", sales: 2050000 },
    { month: "Oct", sales: 2230000 },
    { month: "Nov", sales: 2410000 },
    { month: "Dec", sales: 2540000 },
    { month: "Jan", sales: 2620000 },
    { month: "Feb", sales: 2710000 },
    { month: "Mar", sales: 2800000 },
  ];

  // Revenue by Course (Top 6 courses, 8L - 45L)
  const courseRevenueData = [
    { course: "Full Stack Dev", revenue: 4520000 },
    { course: "Data Science", revenue: 3860000 },
    { course: "Cloud Computing", revenue: 2840000 },
    { course: "Cybersecurity", revenue: 2210000 },
    { course: "UI/UX Design", revenue: 1650000 },
    { course: "Digital Mktg", revenue: 1180000 },
  ];

  // Kanban Pipeline Stages
  const pipelineStages = [
    {
      stage: "Prospecting",
      count: "28 leads",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      leads: [
        { name: "Tech Mahindra Academy", value: "₹ 4,20,000", rep: "Arjun S." },
        { name: "Cognizant Talent Hub", value: "₹ 3,50,000", rep: "Pooja M." },
        { name: "Brilliance Academy", value: "₹ 2,10,000", rep: "Kartik D." },
      ],
    },
    {
      stage: "Qualification",
      count: "19 leads",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      leads: [
        { name: "Global Tech Institute", value: "₹ 5,80,000", rep: "Amit J." },
        { name: "Apex Skill Ventures", value: "₹ 4,00,000", rep: "Ritu S." },
        { name: "Innovate Edu Corp", value: "₹ 3,20,000", rep: "Sneha R." },
      ],
    },
    {
      stage: "Proposal",
      count: "12 leads",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      leads: [
        { name: "Zenith Infotech", value: "₹ 6,50,000", rep: "Arjun S." },
        { name: "FutureSkills Delhi", value: "₹ 4,80,000", rep: "Pooja M." },
        { name: "EduSphere Systems", value: "₹ 3,90,000", rep: "Kartik D." },
      ],
    },
    {
      stage: "Negotiation",
      count: "8 leads",
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
      leads: [
        { name: "Prime EdTech Partners", value: "₹ 8,20,000", rep: "Ritu S." },
        { name: "Vector Learning Hub", value: "₹ 5,40,000", rep: "Arjun S." },
        { name: "Quantum Soft Labs", value: "₹ 4,60,000", rep: "Amit J." },
      ],
    },
    {
      stage: "Won",
      count: "423 closed",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      leads: [
        { name: "DPS International", value: "₹ 4,50,000", rep: "Pooja M." },
        { name: "Edvantage Hub", value: "₹ 2,80,000", rep: "Kartik D." },
        { name: "SkillForge Academy", value: "₹ 3,40,000", rep: "Sneha R." },
      ],
    },
  ];

  // Top Performing Sales Executives
  const topSalesReps = [
    {
      rank: 1,
      name: "Arjun Sharma",
      leads: 184,
      conversions: 64,
      rate: "34.8%",
      revenue: 3840000,
    },
    {
      rank: 2,
      name: "Pooja Mehta",
      leads: 172,
      conversions: 58,
      rate: "33.7%",
      revenue: 3420000,
    },
    {
      rank: 3,
      name: "Kartik Das",
      leads: 155,
      conversions: 51,
      rate: "32.9%",
      revenue: 2980000,
    },
    {
      rank: 4,
      name: "Ritu Sen",
      leads: 142,
      conversions: 47,
      rate: "33.1%",
      revenue: 2750000,
    },
    {
      rank: 5,
      name: "Amit Joshi",
      leads: 136,
      conversions: 42,
      rate: "30.9%",
      revenue: 2410000,
    },
    {
      rank: 6,
      name: "Sneha Roy",
      leads: 128,
      conversions: 39,
      rate: "30.5%",
      revenue: 2240000,
    },
  ];

  const formatCurrency = (val) => `₹ ${val.toLocaleString("en-IN")}`;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Sales Performance (CCO)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Enterprise pipeline velocity, win ratios & executive deal closures
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
            <Trophy size={14} />
            Chief Commercial Officer: Vikram Reddy
          </span>
        </div>
      </div>

      {/* Row 1: 6 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Total Leads */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Target size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Leads
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              1,284
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Cumulative FY Inflow
            </p>
          </div>
        </div>

        {/* Card 2: New Opportunities */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <TrendingUp size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              New Opportunities
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              156
            </h3>
            <p className="text-xs text-indigo-600 font-semibold mt-1">
              Added this month
            </p>
          </div>
        </div>

        {/* Card 3: Won Opportunities */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Trophy size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Won Opportunities
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              423
            </h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <ArrowUpRight size={14} />
              <span>↑ 18.3% conversion rate</span>
            </p>
          </div>
        </div>

        {/* Card 4: Lost Opportunities */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <XCircle size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Lost Opportunities
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              267
            </h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <ArrowDownRight size={14} />
              <span>↓ 8.1% drop vs last quarter</span>
            </p>
          </div>
        </div>

        {/* Card 5: Conversion Rate */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <Percent size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Conversion Rate
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              32.9%
            </h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <ArrowUpRight size={14} />
              <span>↑ 4.2% QoQ gain</span>
            </p>
          </div>
        </div>

        {/* Card 6: Total Sales Revenue */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Sales Revenue
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹ 2,18,40,000
            </h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              Direct B2C & Institutional
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: 2 Charts Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Monthly Sales Growth (AreaChart 12L - 28L) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Monthly Sales Growth
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                FY 2026-27 Revenue Trajectory (₹12L - ₹28L Range)
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              ₹28L Peak
            </span>
          </div>
          <div className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={monthlySalesData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0} />
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
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
                />
                <Tooltip
                  formatter={(val) => [formatCurrency(val), "Sales Inflow"]}
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
                  dataKey="sales"
                  stroke="#22c55e"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#salesGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: Revenue by Course (BarChart 8L - 45L) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Revenue by Course
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Top 6 revenue generator programs
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
              Top 6 Courses
            </span>
          </div>
          <div className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={courseRevenueData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="course"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
                />
                <Tooltip
                  formatter={(val) => [formatCurrency(val), "Revenue"]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Sales Pipeline (Kanban-Style Stage Columns) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Active Sales Pipeline & Deal Stages
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live prospective institutional & B2B accounts across all funnel stages
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            486 Total Deals Tracked
          </span>
        </div>

        <div className="pt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pipelineStages.map((col, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800">
                  {col.stage}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${col.badgeColor}`}
                >
                  {col.count}
                </span>
              </div>

              <div className="space-y-2">
                {col.leads.map((lead, lIdx) => (
                  <div
                    key={lIdx}
                    className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1"
                  >
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {lead.name}
                    </p>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono font-bold text-slate-900">
                        {lead.value}
                      </span>
                      <span className="text-slate-400 text-[10px]">
                        {lead.rep}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="w-full text-center text-[11px] font-semibold text-slate-500 hover:text-slate-800 py-1 transition cursor-pointer"
              >
                + View all stage deals
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Row 4: Top Performing Sales Executives Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Top Performing Sales Executives
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Leaderboard ranked by closed revenue & conversion accuracy
            </p>
          </div>
          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
            <Trophy size={13} />
            Executive Leaderboard
          </span>
        </div>

        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pr-2 text-center w-14">Rank</th>
                  <th className="pb-3 px-2">Executive Name</th>
                  <th className="pb-3 px-2 text-center">Leads Handled</th>
                  <th className="pb-3 px-2 text-center">Conversions (Rate)</th>
                  <th className="pb-3 pl-2 text-right">Revenue Generated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topSalesReps.map((rep) => (
                  <tr key={rep.rank} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 pr-2 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-mono font-bold text-xs ${
                          rep.rank === 1
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : rep.rank === 2
                            ? "bg-slate-200 text-slate-700"
                            : rep.rank === 3
                            ? "bg-orange-100 text-orange-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        #{rep.rank}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-semibold text-slate-800">
                      {rep.name}
                    </td>
                    <td className="py-3 px-2 text-center font-mono text-slate-600">
                      {rep.leads}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="font-mono font-bold text-slate-900">
                        {rep.conversions}
                      </span>{" "}
                      <span className="text-[11px] text-emerald-600 font-semibold">
                        ({rep.rate})
                      </span>
                    </td>
                    <td className="py-3 pl-2 font-mono font-bold text-slate-900 text-right">
                      {formatCurrency(rep.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPerformance;
