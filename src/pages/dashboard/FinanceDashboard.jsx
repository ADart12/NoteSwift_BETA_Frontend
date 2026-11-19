import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  Coins,
  Landmark,
  FileText,
  TrendingUp,
  Calendar,
  ChevronDown,
  Plus,
  Users,
  Wrench,
  Plane,
  PartyPopper,
  CheckCircle2,
  X,
  Camera,
} from "lucide-react";
import { getFinanceDashboardSummary } from "../../services/financeDashboardService";
import { createBudget, createExpense } from "../../services/budgetService";
import SelfAttendanceModal from "../../components/attendanceCompo/SelfAttendanceModal";
import { getMyAttendance } from "../../services/attendenceServices";
import toast from "react-hot-toast";

const FinanceDashboard = () => {
  const navigate = useNavigate();

  const [financeData, setFinanceData] = useState({
    fiscalYear: "",
    currentMonth: "",
    totalBudget: 0,
    totalExpenses: 0,
    totalPayroll: 0,
    employeeCount: 0,
    pendingApprovalsCount: 0,
    budgetBalance: 0,
    usedPercentage: 0,
    remainingPercentage: 0,
    incomeVsExpenses: [
      { week: "Week 1", income: 0, expenses: 0 },
      { week: "Week 2", income: 0, expenses: 0 },
      { week: "Week 3", income: 0, expenses: 0 },
      { week: "Week 4", income: 0, expenses: 0 },
    ],
    recentTransactions: [],
    pendingApprovals: [],
  });
  const [loading, setLoading] = useState(true);

  // Self Attendance state for Finance Manager
  const [attendance, setAttendance] = useState(null);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [attendanceMode, setAttendanceMode] = useState("checkIn");

  // Quick Action Modals
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    category: "Operations",
    department: "Finance",
  });
  const [newBudget, setNewBudget] = useState({
    name: "",
    allocatedAmount: "",
    fiscalYear: "2026-27",
  });

  // Fetch Finance Data
  const loadFinanceData = async () => {
    setLoading(true);
    try {
      const res = await getFinanceDashboardSummary();
      if (res?.data) {
        setFinanceData(res.data);
      }
    } catch (err) {
      console.error("Failed to load finance data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Attendance status for Tek Raj Bhatt
  const loadAttendance = async () => {
    try {
      const data = await getMyAttendance();
      setAttendance(data?.attendance || null);
    } catch (err) {
      console.warn("Attendance load notice:", err.message);
    }
  };

  useEffect(() => {
    loadFinanceData();
    loadAttendance();
  }, []);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCreateExpenseSubmit = async (e) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) {
      toast.error("Please fill in expense title and amount.");
      return;
    }
    try {
      await createExpense({
        title: newExpense.title,
        amount: Number(newExpense.amount),
        category: newExpense.category,
        department: newExpense.department,
        status: "APPROVED",
      });
      toast.success(
        `Expense "${newExpense.title}" (₹ ${formatCurrency(newExpense.amount)}) recorded!`
      );
      setExpenseModalOpen(false);
      setNewExpense({ title: "", amount: "", category: "Operations", department: "Finance" });
      loadFinanceData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save expense.");
    }
  };

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    if (!newBudget.name || !newBudget.allocatedAmount) {
      toast.error("Please enter budget name and allocated amount.");
      return;
    }
    try {
      await createBudget({
        name: newBudget.name,
        allocatedAmount: Number(newBudget.allocatedAmount),
        fiscalYear: newBudget.fiscalYear || "FY 2026-27",
        department: "Finance",
      });
      toast.success(
        `Budget "${newBudget.name}" (₹ ${formatCurrency(newBudget.allocatedAmount)}) allocated!`
      );
      setBudgetModalOpen(false);
      setNewBudget({ name: "", allocatedAmount: "", fiscalYear: "2026-27" });
      loadFinanceData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to allocate budget.");
    }
  };

  const isCheckedIn = !!attendance?.checkIn;
  const isCheckedOut = !!attendance?.checkOut;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <svg className="animate-spin w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-sm font-semibold">Loading Finance Data…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* =========================================================================
          TOP HEADER: Title, Department & Month Selector
      ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Finance Dashboard
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-0.5">
            Department: Finance (FIN)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Attendance Check-in Pill for Finance Manager */}
          <button
            type="button"
            onClick={() => {
              setAttendanceMode(isCheckedIn && !isCheckedOut ? "checkOut" : "checkIn");
              setAttendanceModalOpen(true);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-2xs border cursor-pointer ${
              !isCheckedIn
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                : !isCheckedOut
                ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 animate-pulse"
                : "bg-slate-50 text-slate-600 border-slate-200"
            }`}
            title="Perform your daily biometric webcam + GPS attendance"
          >
            <Camera size={15} />
            <span>
              {!isCheckedIn
                ? "Check In (Webcam)"
                : !isCheckedOut
                ? `Checked In (${attendance.checkIn}) • Check Out`
                : "Shift Completed"}
            </span>
          </button>

          {/* Month Selector Pill (matches Image 3) */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 shadow-2xs">
            <Calendar size={16} className="text-slate-400" />
            <span>Nov 2026</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 1: 5 METRIC STATS CARDS (Exact match to Image 3)
      ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Budget */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Wallet size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Total Budget</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹ {formatCurrency(financeData.totalBudget)}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">{financeData.fiscalYear}</p>
          </div>
        </div>

        {/* Card 2: Total Expenses */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Coins size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Total Expenses</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹ {formatCurrency(financeData.totalExpenses)}
            </h3>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
              <span>↓</span>
              <span>{financeData.usedPercentage}% of budget</span>
            </p>
          </div>
        </div>

        {/* Card 3: Total Payroll */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Landmark size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Total Payroll</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹ {formatCurrency(financeData.totalPayroll)}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
              <Users size={12} className="text-slate-400" />
              <span>{financeData.employeeCount} employees</span>
            </p>
          </div>
        </div>

        {/* Card 4: Pending Approvals */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FileText size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Pending Approvals</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {financeData.pendingApprovalsCount}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Expenses / Reimbursements</p>
          </div>
        </div>

        {/* Card 5: Budget Balance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <TrendingUp size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Budget Balance</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹ {formatCurrency(financeData.budgetBalance)}
            </h3>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>{financeData.remainingPercentage}% remaining</span>
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: CHARTS (Income vs Expenses Bar Chart & Budget Utilization Donut)
      ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Income vs Expenses (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <h3 className="text-base font-bold text-slate-800">
                Income vs Expenses
              </h3>

              <div className="flex items-center gap-4">
                {/* Legend */}
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#22c55e]" />
                    Income
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#ef4444]" />
                    Expenses
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600">
                  <span>This Month</span>
                  <ChevronDown size={12} />
                </div>
              </div>
            </div>

            {/* Bar Chart Area */}
            <div className="mt-6 h-64 flex">
              {/* Y-Axis scale */}
              <div className="flex flex-col justify-between text-[11px] text-slate-400 font-mono pr-4 text-right select-none pb-7">
                <span>₹ 10,00,000</span>
                <span>₹ 8,00,000</span>
                <span>₹ 6,00,000</span>
                <span>₹ 4,00,000</span>
                <span>₹ 2,00,000</span>
                <span>₹ 0</span>
              </div>

              {/* Chart Columns */}
              <div className="flex-1 flex flex-col justify-between border-b border-slate-200 relative">
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-7">
                  <div className="border-b border-slate-100 w-full" />
                  <div className="border-b border-slate-100 w-full" />
                  <div className="border-b border-slate-100 w-full" />
                  <div className="border-b border-slate-100 w-full" />
                  <div className="border-b border-slate-100 w-full" />
                  <div className="w-full" />
                </div>

                {/* Bars per Week */}
                <div className="flex-1 flex items-end justify-around pb-2 z-10">
                  {financeData.incomeVsExpenses.map((w, idx) => {
                    const maxVal = 1000000;
                    const incomeHeight = Math.min(100, Math.max(10, (w.income / maxVal) * 100));
                    const expenseHeight = Math.min(100, Math.max(10, (w.expenses / maxVal) * 100));

                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 group">
                        <div className="flex items-end gap-1.5 h-48">
                          {/* Income Bar (Green) */}
                          <div
                            style={{ height: `${incomeHeight}%` }}
                            className="w-7 sm:w-9 bg-[#22c55e] rounded-t-sm hover:brightness-110 transition-all cursor-pointer relative"
                            title={`Income: ₹ ${formatCurrency(w.income)}`}
                          />
                          {/* Expense Bar (Red) */}
                          <div
                            style={{ height: `${expenseHeight}%` }}
                            className="w-7 sm:w-9 bg-[#ef4444] rounded-t-sm hover:brightness-110 transition-all cursor-pointer relative"
                            title={`Expenses: ₹ ${formatCurrency(w.expenses)}`}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-500 font-sans">
                          {w.week}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Budget Utilization Donut (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">
              Budget Utilization
            </h3>
          </div>

          <div className="py-6 flex flex-col sm:flex-row items-center justify-around gap-6">
            {/* Donut Progress Ring */}
            <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                {/* Background Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r="62"
                  stroke="#e2e8f0"
                  strokeWidth="20"
                  fill="transparent"
                />
                {/* Filled Utilization Ring (36.8%) */}
                <circle
                  cx="80"
                  cy="80"
                  r="62"
                  stroke="#2563eb"
                  strokeWidth="20"
                  fill="transparent"
                  strokeDasharray="389.5"
                  strokeDashoffset={389.5 * (1 - financeData.usedPercentage / 100)}
                  strokeLinecap="round"
                />
              </svg>

              {/* Center percentage label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold text-slate-800 font-mono">
                  {financeData.usedPercentage}%
                </span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Utilized
                </span>
              </div>
            </div>

            {/* Breakdown details */}
            <div className="space-y-3.5 w-full sm:w-auto">
              <div className="flex items-center justify-between gap-6">
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="w-3 h-3 rounded-xs bg-[#2563eb] inline-block" />
                  Used Budget
                </span>
                <span className="text-sm font-bold font-mono text-slate-800">
                  ₹ {formatCurrency(financeData.totalExpenses)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-6">
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span className="w-3 h-3 rounded-xs bg-[#cbd5e1] inline-block" />
                  Remaining
                </span>
                <span className="text-sm font-bold font-mono text-slate-800">
                  ₹ {formatCurrency(financeData.budgetBalance)}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-6">
                <span className="text-xs font-bold text-slate-800">
                  Total Budget
                </span>
                <span className="text-sm font-extrabold font-mono text-slate-900">
                  ₹ {formatCurrency(financeData.totalBudget)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 3: RECENT TRANSACTIONS | PENDING APPROVALS | QUICK ACTIONS
      ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Panel 1: Recent Finance Transactions (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                Recent Finance Transactions
              </h3>
              <button
                type="button"
                onClick={() => navigate("/finance/transactions")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <span>→</span>
              </button>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3 pr-2">Date</th>
                    <th className="py-3 px-2">Description</th>
                    <th className="py-3 px-2">Category</th>
                    <th className="py-3 px-2">Amount</th>
                    <th className="py-3 pl-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {financeData.recentTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-slate-400 font-medium text-xs">
                        No transactions found in the database.
                      </td>
                    </tr>
                  ) : (
                    financeData.recentTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 pr-2 font-mono text-slate-500 whitespace-nowrap">
                          {tx.date}
                        </td>
                        <td className="py-3.5 px-2 font-semibold text-slate-800">
                          {tx.description}
                        </td>
                        <td className="py-3.5 px-2">
                          <span
                            className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                              tx.categoryColor === "blue"
                                ? "bg-blue-50 text-blue-700"
                                : tx.categoryColor === "purple"
                                ? "bg-purple-50 text-purple-700"
                                : tx.categoryColor === "amber"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            {tx.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 font-bold font-mono text-slate-800 whitespace-nowrap">
                          ₹ {formatCurrency(tx.amount)}
                        </td>
                        <td className="py-3.5 pl-2 text-right">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
                              tx.status === "Approved"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Panel 2: Pending Approvals (5) (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                Pending Approvals ({financeData.pendingApprovalsCount})
              </h3>
              <button
                type="button"
                onClick={() => navigate("/finance/expenses")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <span>→</span>
              </button>
            </div>

            <div className="space-y-4 mt-4">
              {financeData.pendingApprovals.length === 0 ? (
                <div className="py-10 text-center text-slate-400 font-medium text-xs">
                  No pending approvals found.
                </div>
              ) : (
                financeData.pendingApprovals.map((pa) => (
                  <div
                    key={pa.id}
                    className="p-3.5 rounded-2xl bg-slate-50/70 hover:bg-slate-50 transition border border-slate-100 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          pa.type === "facility"
                            ? "bg-blue-100/80 text-blue-600"
                            : pa.type === "event"
                            ? "bg-pink-100/80 text-pink-600"
                            : "bg-sky-100/80 text-sky-600"
                        }`}
                      >
                        {pa.type === "facility" ? (
                          <Wrench size={18} />
                        ) : pa.type === "event" ? (
                          <PartyPopper size={18} />
                        ) : (
                          <Plane size={18} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate">
                          {pa.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          ₹ {formatCurrency(pa.amount)} • {pa.department}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400 font-medium shrink-0 whitespace-nowrap">
                      {pa.timeAgo}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Panel 3: Quick Actions (3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">
                Quick Actions
              </h3>
            </div>

            <div className="space-y-3 mt-4">
              {/* Button 1: Create Expense */}
              <button
                type="button"
                onClick={() => setExpenseModalOpen(true)}
                className="w-full py-3.5 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-2xs hover:scale-[1.01] cursor-pointer"
              >
                <Plus size={16} />
                <span>Create Expense</span>
              </button>

              {/* Button 2: Allocate / Update Budget */}
              <button
                type="button"
                onClick={() => setBudgetModalOpen(true)}
                className="w-full py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-2xs hover:scale-[1.01] cursor-pointer"
              >
                <FileText size={16} />
                <span>Allocate / Update Budget</span>
              </button>

              {/* Button 3: Process Payroll */}
              <button
                type="button"
                onClick={() => navigate("/payroll")}
                className="w-full py-3.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-2xs hover:scale-[1.01] cursor-pointer"
              >
                <Users size={16} />
                <span>Process Payroll</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODALS: Self Attendance & Quick Actions
      ========================================================================= */}
      {/* Self-Attendance Modal */}
      <SelfAttendanceModal
        isOpen={attendanceModalOpen}
        onClose={() => setAttendanceModalOpen(false)}
        mode={attendanceMode}
        onSuccess={(updated) => {
          setAttendance(updated);
          loadAttendance();
        }}
      />

      {/* Create Expense Modal */}
      {expenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Plus size={18} className="text-blue-600" />
                <span>Create New Expense</span>
              </h3>
              <button
                type="button"
                onClick={() => setExpenseModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateExpenseSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Expense Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. AWS Cloud Hosting Subscription"
                  value={newExpense.title}
                  onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 45000"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Category
                  </label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="Operations">Operations</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Travel">Travel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newExpense.department}
                    readOnly
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setExpenseModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Allocate Budget Modal */}
      {budgetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <span>Allocate / Update Budget</span>
              </h3>
              <button
                type="button"
                onClick={() => setBudgetModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleBudgetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Budget Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Q4 Infrastructure & Marketing Allocation"
                  value={newBudget.name}
                  onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Allocation Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 500000"
                  value={newBudget.allocatedAmount}
                  onChange={(e) => setNewBudget({ ...newBudget, allocatedAmount: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  Fiscal Year
                </label>
                <input
                  type="text"
                  value={newBudget.fiscalYear}
                  onChange={(e) => setNewBudget({ ...newBudget, fiscalYear: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setBudgetModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Allocate Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceDashboard;
