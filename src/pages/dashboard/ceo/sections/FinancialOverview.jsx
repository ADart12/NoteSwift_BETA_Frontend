import { useState, useEffect } from "react";
import {
  Wallet,
  Coins,
  TrendingUp,
  Percent,
  FileText,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
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
  ResponsiveContainer,
} from "recharts";
import { getExecutiveOverview } from "../../../../services/ceoDashboardService";
import { getFinanceDashboardSummary } from "../../../../services/financeDashboardService";
import api from "../../../../api/axios";

// ─── Department colours for the pie chart ───────────────────────────────────
const DEPT_COLORS = [
  "#6366f1", "#06b6d4", "#22c55e", "#ec4899",
  "#f97316", "#a855f7", "#3b82f6", "#eab308",
];

const FinancialOverview = () => {
  const [kpi, setKpi]           = useState(null);
  const [monthly, setMonthly]   = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [pending, setPending]   = useState([]);
  const [deptBudget, setDeptBudget] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        // ── 1. CEO Executive Overview (KPIs + monthly chart) ──────────────
        const execRes = await getExecutiveOverview();
        if (execRes?.data) {
          const d = execRes.data;
          setKpi(d.kpiCards || null);
          // Filter only months with real data for the bar chart
          const chart = (d.monthlyRevenueData || []).filter(
            (m) => m.revenue > 0 || m.expenses > 0
          );
          setMonthly(chart);
        }

        // ── 2. Outstanding Invoices (Receivable, not Paid/Cancelled) ─────
        const invRes = await api.get("/finance/invoices", {
          params: { type: "Receivable", isDeleted: false },
        });
        const allInv = invRes?.data?.data?.invoices || invRes?.data?.invoices || [];
        const outstanding = allInv.filter(
          (inv) => !["Paid", "Cancelled"].includes(inv.status)
        );
        setInvoices(outstanding);

        // ── 3. Pending Expense Approvals from Finance summary ────────────
        const finRes = await getFinanceDashboardSummary();
        setPending(finRes?.data?.pendingApprovals || []);

        // ── 4. Department budget split from budgets collection ───────────
        // We derive this from the finance summary budgetBalance / totalBudget
        // but if no budget data exists we show nothing.
        setDeptBudget([]); // Will populate if budget-by-dept API is available later

      } catch (err) {
        console.error("FinancialOverview fetch error:", err);
        setError("Failed to load financial data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const fmt = (val) =>
    `₹ ${Number(val || 0).toLocaleString("en-IN")}`;

  const fmtShort = (val) => {
    const n = Number(val || 0);
    if (n >= 10000000) return `₹ ${(n / 10000000).toFixed(2)} Cr`;
    if (n >= 100000)   return `₹ ${(n / 100000).toFixed(2)} L`;
    return fmt(n);
  };

  const statusBadge = (status) => {
    if (status === "Overdue")
      return "bg-red-50 text-red-700 border border-red-200";
    if (status === "Due Soon" || status === "Partially_Paid")
      return "bg-amber-50 text-amber-700 border border-amber-200";
    return "bg-indigo-50 text-indigo-700 border border-indigo-200";
  };

  const friendlyStatus = (s) =>
    s === "Partially_Paid" ? "Part Paid" : s;

  const timeAgo = (dateStr) => {
    if (!dateStr) return "—";
    const diff = Date.now() - new Date(dateStr).getTime();
    const hrs  = Math.floor(diff / 3600000);
    const days = Math.floor(hrs / 24);
    if (days > 0)  return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hrs > 0)   return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  // ─── Loading / Error ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <svg className="animate-spin w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-sm font-semibold">Loading Financial Data…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center text-rose-500 font-semibold text-sm">
          <AlertCircle className="mx-auto mb-2" size={28} />
          {error}
        </div>
      </div>
    );
  }

  // ─── Derived values ───────────────────────────────────────────────────────
  const totalRevenue  = kpi?.totalRevenue?.value  || 0;
  const totalExpenses = kpi?.totalExpenses?.value  || 0;
  const netProfit     = kpi?.netProfit?.value      || 0;
  const profitMargin  = totalRevenue > 0
    ? Number(((netProfit / totalRevenue) * 100).toFixed(1))
    : 0;

  const revGrowth      = kpi?.totalRevenue?.growth  || "—";
  const revPositive    = kpi?.totalRevenue?.positive ?? true;
  const profitGrowth   = kpi?.netProfit?.growth     || "—";
  const profitPositive = kpi?.netProfit?.positive   ?? true;

  // ─── Custom Tooltips ──────────────────────────────────────────────────────
  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs font-medium border border-slate-700">
          <p className="font-semibold text-slate-300">{label} 2026</p>
          <div className="mt-1.5 space-y-1">
            <p className="text-indigo-400">
              Revenue:{" "}
              <span className="font-mono font-bold">{fmt(payload[0]?.value)}</span>
            </p>
            <p className="text-rose-400">
              Expenses:{" "}
              <span className="font-mono font-bold">{fmt(payload[1]?.value)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Financial Overview (CFO)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Fiscal health, monthly burn rate, budget allocations &amp; invoices
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 self-start sm:self-auto">
          Live · DB Data
        </span>
      </div>

      {/* ── Row 1: 4 KPI Cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Wallet size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Revenue</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {totalRevenue > 0 ? fmtShort(totalRevenue) : "₹ 0"}
            </h3>
            {totalRevenue > 0 ? (
              <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${revPositive ? "text-emerald-600" : "text-rose-600"}`}>
                {revPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>{revGrowth} vs last month</span>
              </p>
            ) : (
              <p className="text-xs text-slate-400 mt-1">No revenue recorded</p>
            )}
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Coins size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Expenses</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {totalExpenses > 0 ? fmtShort(totalExpenses) : "₹ 0"}
            </h3>
            {totalExpenses > 0 ? (
              <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                <ArrowUpRight size={14} />
                <span>Operational expenditure</span>
              </p>
            ) : (
              <p className="text-xs text-slate-400 mt-1">No expenses recorded</p>
            )}
          </div>
        </div>

        {/* Net Profit */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <TrendingUp size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Net Profit</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {netProfit > 0 ? fmtShort(netProfit) : "₹ 0"}
            </h3>
            {netProfit > 0 ? (
              <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${profitPositive ? "text-emerald-600" : "text-rose-600"}`}>
                {profitPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>{profitGrowth} vs last month</span>
              </p>
            ) : (
              <p className="text-xs text-slate-400 mt-1">No profit data</p>
            )}
          </div>
        </div>

        {/* Profit Margin */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <Percent size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Profit Margin</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {profitMargin > 0 ? `${profitMargin}%` : "0%"}
            </h3>
            {totalRevenue > 0 ? (
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <ArrowUpRight size={14} />
                <span>Operating margin</span>
              </p>
            ) : (
              <p className="text-xs text-slate-400 mt-1">No data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Row 2: Bar Chart ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-800">Revenue vs Expenses</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {monthly.length > 0
                ? `Last ${monthly.length} month(s) with recorded data`
                : "No transaction data recorded yet"}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1]" /> Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" /> Expenses
            </span>
          </div>
        </div>

        {monthly.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-slate-400 text-sm font-medium">
            No monthly revenue or expense data found in the database.
          </div>
        ) : (
          <div className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthly} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="revenue"  fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* ── Row 3: Outstanding Invoices + Pending Approvals ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outstanding Invoices */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">Outstanding Invoices</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {invoices.length > 0
                  ? `${invoices.length} unpaid receivable invoice${invoices.length > 1 ? "s" : ""}`
                  : "All invoices settled"}
              </p>
            </div>
            <FileText size={18} className="text-slate-400" />
          </div>
          <div className="p-5 space-y-3">
            {invoices.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm font-medium">
                No outstanding invoices found.
              </div>
            ) : (
              invoices.slice(0, 5).map((inv) => (
                <div
                  key={inv._id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono font-bold text-slate-900 text-xs">
                        {inv.invoiceNumber || inv._id?.toString().slice(-6)}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusBadge(inv.status)}`}>
                        {friendlyStatus(inv.status)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 truncate mt-0.5">{inv.clientName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Due:{" "}
                      {inv.dueDate
                        ? new Date(inv.dueDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold font-mono text-slate-900">
                      {fmt(inv.totalAmount)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Expense Approvals */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">Pending Expense Approvals</h3>
              <p className="text-xs text-slate-500 mt-0.5">Action required by CFO / CEO</p>
            </div>
            <AlertCircle size={18} className={pending.length > 0 ? "text-amber-500" : "text-slate-300"} />
          </div>
          <div className="p-5 space-y-3">
            {pending.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm font-medium">
                No pending expense approvals.
              </div>
            ) : (
              pending.slice(0, 5).map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.department}</p>
                    <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock size={10} />
                      <span>{item.timeAgo || "—"}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold font-mono text-slate-900">
                      {fmt(item.amount)}
                    </span>
                    <div className="mt-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialOverview;
