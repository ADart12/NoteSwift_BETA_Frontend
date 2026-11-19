import React, { useState, useEffect, useCallback } from "react";
import {
  TrendingUp,
  DollarSign,
  TrendingDown,
  Users,
  GraduationCap,
  BookOpen,
  Building2,
  BarChart2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  AlertCircle,
  FileBarChart,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getExecutiveOverview } from "../../../../services/ceoDashboardService";

const ExecutiveOverview = ({ filters = {} }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchOverviewData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const res = await getExecutiveOverview(filters);
      if (res?.success && res?.data) {
        setData(res.data);
      } else {
        throw new Error(res?.message || "Failed to load executive overview");
      }
    } catch (err) {
      console.error("Executive Overview API Error:", err);
      setError(err.response?.data?.message || err.message || "Failed to load live data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchOverviewData();
  }, [fetchOverviewData]);

  const formatCurrency = (val) => `₹ ${Number(val || 0).toLocaleString("en-IN")}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl shadow-xl text-xs font-medium border border-slate-700">
          <p className="font-semibold text-slate-300">{label}</p>
          <p className="text-emerald-400 font-mono font-bold mt-1 text-sm">
            {formatCurrency(payload[0].value)}
          </p>
          {payload[0].payload.displayRev > 0 && (
            <p className="text-[10px] text-slate-400 mt-0.5">
              ({payload[0].payload.displayRev} Lakhs)
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading && !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-8 w-64 bg-slate-200 rounded-lg" />
          <div className="h-8 w-32 bg-slate-200 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 h-32 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-slate-100 rounded" />
                <div className="h-6 w-36 bg-slate-200 rounded" />
                <div className="h-3 w-28 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-6 h-80" />
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 p-6 h-80" />
        </div>
      </div>
    );
  }

  const kpis = data?.kpiCards || {};
  const monthlyRevenueData = data?.monthlyRevenueData || [];
  const quickStats = data?.quickStats || [];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Executive Overview
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Live enterprise indicators & company-wide performance · {data?.meta?.fiscalYear || "FY 2026-27"}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchOverviewData(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition shadow-xs cursor-pointer disabled:opacity-60"
            title="Refresh from MongoDB"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin text-indigo-600" : "text-slate-500"} />
            <span>{refreshing ? "Refreshing..." : "Sync Live Data"}</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Database Feed
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-700 text-sm">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
          <button
            onClick={() => fetchOverviewData(true)}
            className="ml-auto underline font-semibold text-rose-800 hover:text-rose-900 text-xs cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* 9 KPI Stat Cards Grid (3 cols on lg, 2 on md, 1 on sm) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Revenue
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {kpis.totalRevenue?.formatted || "₹ 0"}
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-1 flex items-center gap-1">
              {kpis.totalRevenue?.growth && kpis.totalRevenue?.growth !== "—" ? (
                <>
                  <ArrowUpRight size={14} className="text-emerald-600" />
                  <span className="text-emerald-600">{kpis.totalRevenue.growth}</span>
                  <span>{kpis.totalRevenue.growthText}</span>
                </>
              ) : (
                <span>{kpis.totalRevenue?.growthText || "No revenue recorded"}</span>
              )}
            </p>
          </div>
        </div>

        {/* Card 2: Net Profit */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <TrendingUp size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Net Profit
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {kpis.netProfit?.formatted || "₹ 0"}
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-1 flex items-center gap-1">
              {kpis.netProfit?.growthText && kpis.netProfit?.growthText !== "—" ? (
                <span>{kpis.netProfit.growthText}</span>
              ) : (
                <span>Calculated from revenue minus expenses</span>
              )}
            </p>
          </div>
        </div>

        {/* Card 3: Total Expenses */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <TrendingDown size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Expenses
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {kpis.totalExpenses?.formatted || "₹ 0"}
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              {kpis.totalExpenses?.growthText || "Operational expenditure"}
            </p>
          </div>
        </div>

        {/* Card 4: Total Employees */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Employees
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {kpis.totalEmployees?.value ?? 0}
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              {kpis.totalEmployees?.growthText || "No employees registered"}
            </p>
          </div>
        </div>

        {/* Card 5: Active Students */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <GraduationCap size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Active Students
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {kpis.activeStudents?.formatted ?? "0"}
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              {kpis.activeStudents?.growthText || "No enrolled students"}
            </p>
          </div>
        </div>

        {/* Card 6: Active Courses */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
            <BookOpen size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Active Courses
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {kpis.activeCourses?.value ?? 0}
            </h3>
            <p className="text-xs text-indigo-600 font-semibold mt-1">
              {kpis.activeCourses?.subtitleText || "No active courses"}
            </p>
          </div>
        </div>

        {/* Card 7: Total Departments */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Building2 size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Departments
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {kpis.totalDepartments?.value ?? 0}
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              {kpis.totalDepartments?.statusText || "No departments configured"}
            </p>
          </div>
        </div>

        {/* Card 8: Revenue Growth */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <BarChart2 size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Revenue Growth
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {kpis.revenueGrowth?.value ?? "0%"}
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              {kpis.revenueGrowth?.subtitleText || "vs prior period"}
            </p>
          </div>
        </div>

        {/* Card 9: Pending Approvals */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Clock size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Pending Approvals
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {kpis.pendingApprovals?.value ?? 0}
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              {kpis.pendingApprovals?.subtitleText || "No pending approvals"}
            </p>
          </div>
        </div>
      </div>

      {/* Below cards: 2-column section (Chart + Quick Stats Table) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Monthly Revenue Trend (AreaChart) - 7 cols */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Monthly Revenue Trend
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Aggregated from invoices and student tuition fees
              </p>
            </div>
            {monthlyRevenueData.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                  Revenue (INR)
                </span>
              </div>
            )}
          </div>
          <div className="p-5">
            {monthlyRevenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart
                  data={monthlyRevenueData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
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
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-2">
                <FileBarChart size={36} className="text-slate-300 stroke-1" />
                <p className="text-sm font-medium text-slate-500">No revenue transactions recorded yet</p>
                <p className="text-xs text-slate-400">Invoices and tuition fee receipts will appear here automatically</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Quick Stats Summary Table - 5 cols */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Quick Stats Summary
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current month comparison vs previous
              </p>
            </div>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pr-2">Metric</th>
                    <th className="pb-3 px-2 text-right">This Month</th>
                    <th className="pb-3 px-2 text-right">Last Month</th>
                    <th className="pb-3 pl-2 text-right">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {quickStats.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 pr-2 font-medium text-slate-700">
                        {item.metric}
                      </td>
                      <td className="py-3 px-2 font-bold font-mono text-slate-900 text-right">
                        {item.thisMonth}
                      </td>
                      <td className="py-3 px-2 font-mono text-slate-500 text-right">
                        {item.lastMonth}
                      </td>
                      <td className="py-3 pl-2 text-right">
                        <span
                          className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-bold text-[11px] ${
                            item.positive
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {item.positive ? (
                            <ArrowUpRight size={12} />
                          ) : (
                            <ArrowDownRight size={12} />
                          )}
                          {item.growth}
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
    </div>
  );
};

export default ExecutiveOverview;
