import { useState, useEffect, useCallback } from "react";
import {
  Receipt,
  TrendingDown,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  Calendar,
  Edit3,
  Trash2,
  X,
  RefreshCw,
  Tag,
  Building2,
  AlertCircle,
  ChevronDown,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../../services/expensesService";
import { getDepartmentList, getBudgets } from "../../services/budgetService";
import toast from "react-hot-toast";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Travel & Conveyance",
  "Office Supplies",
  "Software & Licenses",
  "Infrastructure",
  "Marketing & Events",
  "Training & Development",
  "Utilities",
  "Legal & Compliance",
  "Salaries & Benefits",
  "Miscellaneous",
];

const STATUS_OPTIONS = ["PENDING", "APPROVED", "REJECTED"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatINR = (val) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(val || 0);

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const statusConfig = {
  APPROVED: {
    label: "Approved",
    cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  PENDING: {
    label: "Pending",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400",
  },
  REJECTED: {
    label: "Rejected",
    cls: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
  },
};

const categoryColorMap = {
  "Travel & Conveyance": "bg-sky-50 text-sky-700 border-sky-200",
  "Office Supplies": "bg-teal-50 text-teal-700 border-teal-200",
  "Software & Licenses": "bg-indigo-50 text-indigo-700 border-indigo-200",
  Infrastructure: "bg-blue-50 text-blue-700 border-blue-200",
  "Marketing & Events": "bg-amber-50 text-amber-700 border-amber-200",
  "Training & Development": "bg-purple-50 text-purple-700 border-purple-200",
  Utilities: "bg-orange-50 text-orange-700 border-orange-200",
  "Legal & Compliance": "bg-rose-50 text-rose-700 border-rose-200",
  "Salaries & Benefits": "bg-emerald-50 text-emerald-700 border-emerald-200",
  Miscellaneous: "bg-slate-50 text-slate-700 border-slate-200",
};

const getCategoryColor = (cat) =>
  categoryColorMap[cat] || "bg-slate-50 text-slate-700 border-slate-200";

// ─── Empty Form ────────────────────────────────────────────────────────────────
const emptyForm = () => ({
  title: "",
  description: "",
  amount: "",
  category: CATEGORIES[0],
  department: "Finance",
  budget: "",
  expenseDate: new Date().toISOString().split("T")[0],
  status: "PENDING",
});

// ─── Component ─────────────────────────────────────────────────────────────────
const ExpensesPage = () => {
  // Data
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Stats (derived)
  const [stats, setStats] = useState({
    total: 0,
    totalAmount: 0,
    approved: 0,
    approvedAmount: 0,
    pending: 0,
    pendingAmount: 0,
    rejected: 0,
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");

  // Modals
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const [activeExpense, setActiveExpense] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [editForm, setEditForm] = useState({});

  // ─── Fetch ─────────────────────────────────────────────────────────────────

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [expRes, budgetRes] = await Promise.all([
        getExpenses(),
        getBudgets({}),
      ]);

      const rawExpenses = expRes?.expenses || [];
      const rawBudgets = budgetRes?.data || [];

      setExpenses(rawExpenses);
      setBudgets(rawBudgets);

      // Derive stats
      const totalAmount = rawExpenses.reduce((s, e) => s + (e.amount || 0), 0);
      const approved = rawExpenses.filter((e) => e.status === "APPROVED");
      const pending = rawExpenses.filter((e) => e.status === "PENDING");
      const rejected = rawExpenses.filter((e) => e.status === "REJECTED");

      setStats({
        total: rawExpenses.length,
        totalAmount,
        approved: approved.length,
        approvedAmount: approved.reduce((s, e) => s + e.amount, 0),
        pending: pending.length,
        pendingAmount: pending.reduce((s, e) => s + e.amount, 0),
        rejected: rejected.length,
      });
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
      toast.error("Could not load expenses. Using cached data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ─── Filtered list ─────────────────────────────────────────────────────────

  const filteredExpenses = expenses.filter((e) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      e.title?.toLowerCase().includes(q) ||
      e.category?.toLowerCase().includes(q) ||
      e.department?.toLowerCase().includes(q) ||
      e.requestedBy?.fullName?.toLowerCase().includes(q);

    const matchStatus = filterStatus === "all" || e.status === filterStatus;
    const matchCategory =
      filterCategory === "all" || e.category === filterCategory;

    let matchMonth = true;
    if (filterMonth !== "all" && e.expenseDate) {
      const d = new Date(e.expenseDate);
      matchMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` === filterMonth;
    }

    return matchSearch && matchStatus && matchCategory && matchMonth;
  });

  // Build month options
  const monthOptions = Array.from(
    new Set(
      expenses
        .filter((e) => e.expenseDate)
        .map((e) => {
          const d = new Date(e.expenseDate);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        })
    )
  ).sort((a, b) => b.localeCompare(a));

  // ─── Create ────────────────────────────────────────────────────────────────

  const handleCreate = async (ev) => {
    ev.preventDefault();
    if (!form.title || !form.amount || !form.category) {
      toast.error("Title, amount and category are required.");
      return;
    }
    try {
      setSubmitting(true);
      await createExpense({
        ...form,
        budget: form.budget || undefined,
      });
      toast.success(`Expense "${form.title}" recorded!`);
      setCreateOpen(false);
      setForm(emptyForm());
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create expense.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Edit ──────────────────────────────────────────────────────────────────

  const openEdit = (expense) => {
    setActiveExpense(expense);
    setEditForm({
      title: expense.title,
      description: expense.description || "",
      amount: expense.amount,
      category: expense.category,
      department: expense.department,
      expenseDate: expense.expenseDate
        ? new Date(expense.expenseDate).toISOString().split("T")[0]
        : "",
      status: expense.status,
      budget: expense.budget?._id || expense.budget || "",
    });
    setEditOpen(true);
  };

  const handleEdit = async (ev) => {
    ev.preventDefault();
    if (!activeExpense) return;
    try {
      setSubmitting(true);
      await updateExpense(activeExpense._id, editForm);
      toast.success(`Expense updated.`);
      setEditOpen(false);
      setActiveExpense(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update expense.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Delete ────────────────────────────────────────────────────────────────

  const openDelete = (expense) => {
    setActiveExpense(expense);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!activeExpense) return;
    try {
      setSubmitting(true);
      await deleteExpense(activeExpense._id);
      toast.success(`Expense "${activeExpense.title}" deleted.`);
      setDeleteOpen(false);
      setActiveExpense(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete expense.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Detail view ───────────────────────────────────────────────────────────

  const openDetail = (expense) => {
    setActiveExpense(expense);
    setDetailOpen(true);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="space-y-6 pb-12">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Expense Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs">
              FIN
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Department: Finance (FIN) • Operational Expenditure Tracker
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={fetchData}
            title="Refresh"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-orange-600 hover:bg-slate-50 transition shadow-2xs cursor-pointer"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <Plus size={16} />
            <span>Record Expense</span>
          </button>
        </div>
      </div>

      {/* ── Summary Stat Cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Receipt size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Total Expenses</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹ {formatINR(stats.totalAmount)}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">
              {stats.total} records
            </p>
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Approved</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹ {formatINR(stats.approvedAmount)}
            </h3>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1">
              {stats.approved} cleared
            </p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Clock size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Pending Review</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹ {formatINR(stats.pendingAmount)}
            </h3>
            <p className="text-[11px] font-semibold text-amber-600 mt-1">
              {stats.pending} awaiting
            </p>
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <TrendingDown size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Rejected</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {stats.rejected}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">
              entries declined
            </p>
          </div>
        </div>
      </div>

      {/* ── Category Breakdown Strip ─────────────────────────────────────── */}
      {!loading && expenses.length > 0 && (
        <CategoryBreakdown expenses={expenses} />
      )}

      {/* ── Main Table ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by title, category, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
              <Filter size={13} className="text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-semibold text-xs"
              >
                <option value="all">All Statuses</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
              <Tag size={13} className="text-slate-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-semibold text-xs"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {monthOptions.length > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                <Calendar size={13} className="text-slate-400" />
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer font-semibold text-xs"
                >
                  <option value="all">All Months</option>
                  {monthOptions.map((m) => {
                    const [yr, mo] = m.split("-");
                    const label = new Date(`${yr}-${mo}-01`).toLocaleDateString(
                      "en-IN",
                      { month: "short", year: "numeric" }
                    );
                    return (
                      <option key={m} value={m}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-slate-400 font-medium">
          Showing{" "}
          <span className="font-bold text-slate-700">
            {filteredExpenses.length}
          </span>{" "}
          of <span className="font-bold text-slate-700">{expenses.length}</span>{" "}
          records
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 pr-3">Title & Description</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3">Department</th>
                <th className="py-3.5 px-3">Budget Ref</th>
                <th className="py-3.5 px-3">Amount</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-3">Requested By</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 pl-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="py-10 text-center text-slate-400 font-medium"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw size={14} className="animate-spin" />
                      Loading expense records…
                    </div>
                  </td>
                </tr>
              ) : filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <FileText size={32} className="opacity-30" />
                      <p className="font-medium">No expense records found.</p>
                      <p className="text-[11px]">
                        Try adjusting your filters or record a new expense.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((exp) => {
                  const sc = statusConfig[exp.status] || statusConfig.PENDING;
                  return (
                    <tr
                      key={exp._id}
                      className="hover:bg-slate-50/70 transition cursor-pointer"
                      onClick={() => openDetail(exp)}
                    >
                      <td className="py-3.5 pr-3">
                        <p className="font-bold text-slate-900 truncate max-w-[180px]">
                          {exp.title}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate max-w-[180px]">
                          {exp.description || "—"}
                        </p>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold text-[10px] border whitespace-nowrap ${getCategoryColor(
                            exp.category
                          )}`}
                        >
                          {exp.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-500 font-medium whitespace-nowrap">
                        {exp.department || "—"}
                      </td>
                      <td className="py-3.5 px-3 text-slate-500 font-mono text-[11px]">
                        {exp.budget?.name || "General"}
                      </td>
                      <td className="py-3.5 px-3 font-bold font-mono text-slate-900 whitespace-nowrap">
                        ₹ {formatINR(exp.amount)}
                      </td>
                      <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                        {formatDate(exp.expenseDate)}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                        {exp.requestedBy?.fullName || "System"}
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${sc.cls}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}
                          />
                          {sc.label}
                        </span>
                      </td>
                      <td
                        className="py-3.5 pl-3 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openDetail(exp)}
                            title="View Details"
                            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                          >
                            <ArrowUpRight size={15} />
                          </button>
                          <button
                            onClick={() => openEdit(exp)}
                            title="Edit"
                            className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => openDelete(exp)}
                            title="Delete"
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MODAL — CREATE EXPENSE
      ══════════════════════════════════════════════════════════════════ */}
      {createOpen && (
        <Modal onClose={() => setCreateOpen(false)} title="Record New Expense" icon={<Receipt size={18} className="text-orange-600" />}>
          <form onSubmit={handleCreate} className="space-y-3.5">
            <FormField label="Expense Title">
              <input
                type="text"
                placeholder="e.g. Q4 Cloud Hosting Invoice"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="form-input"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Category">
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="form-input"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Amount (₹)">
                <input
                  type="number"
                  placeholder="e.g. 25000"
                  min="1"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  required
                  className="form-input font-mono font-bold"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Department">
                <input
                  type="text"
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  className="form-input"
                />
              </FormField>

              <FormField label="Expense Date">
                <input
                  type="date"
                  value={form.expenseDate}
                  onChange={(e) =>
                    setForm({ ...form, expenseDate: e.target.value })
                  }
                  className="form-input"
                />
              </FormField>
            </div>

            <FormField label="Link to Budget (optional)">
              <select
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="form-input"
              >
                <option value="">— Auto-resolve —</option>
                {budgets.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name} ({b.department?.code})
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Approval Status">
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="form-input"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Description / Notes">
              <textarea
                rows="2"
                placeholder="Additional context or vendor details..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="form-input resize-none"
              />
            </FormField>

            <ModalActions
              onCancel={() => setCreateOpen(false)}
              submitting={submitting}
              label="Record Expense"
              color="orange"
            />
          </form>
        </Modal>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MODAL — EDIT EXPENSE
      ══════════════════════════════════════════════════════════════════ */}
      {editOpen && activeExpense && (
        <Modal
          onClose={() => setEditOpen(false)}
          title="Edit Expense Record"
          icon={<Edit3 size={18} className="text-blue-600" />}
        >
          <form onSubmit={handleEdit} className="space-y-3.5">
            <FormField label="Expense Title">
              <input
                type="text"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                required
                className="form-input"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Category">
                <select
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  className="form-input"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Amount (₹)">
                <input
                  type="number"
                  min="1"
                  value={editForm.amount}
                  onChange={(e) =>
                    setEditForm({ ...editForm, amount: e.target.value })
                  }
                  required
                  className="form-input font-mono font-bold"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Department">
                <input
                  type="text"
                  value={editForm.department}
                  onChange={(e) =>
                    setEditForm({ ...editForm, department: e.target.value })
                  }
                  className="form-input"
                />
              </FormField>

              <FormField label="Expense Date">
                <input
                  type="date"
                  value={editForm.expenseDate}
                  onChange={(e) =>
                    setEditForm({ ...editForm, expenseDate: e.target.value })
                  }
                  className="form-input"
                />
              </FormField>
            </div>

            <FormField label="Status">
              <select
                value={editForm.status}
                onChange={(e) =>
                  setEditForm({ ...editForm, status: e.target.value })
                }
                className="form-input"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Description">
              <textarea
                rows="2"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="form-input resize-none"
              />
            </FormField>

            <ModalActions
              onCancel={() => setEditOpen(false)}
              submitting={submitting}
              label="Save Changes"
              color="blue"
            />
          </form>
        </Modal>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MODAL — CONFIRM DELETE
      ══════════════════════════════════════════════════════════════════ */}
      {deleteOpen && activeExpense && (
        <Modal
          onClose={() => setDeleteOpen(false)}
          title="Delete Expense"
          icon={<AlertCircle size={18} className="text-rose-600" />}
          small
        >
          <div className="space-y-4">
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-xs text-rose-700 font-medium">
              You are about to permanently remove{" "}
              <span className="font-bold">"{activeExpense.title}"</span> (₹{" "}
              {formatINR(activeExpense.amount)}). This action cannot be undone.
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={submitting}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50 transition"
              >
                {submitting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MODAL — EXPENSE DETAIL
      ══════════════════════════════════════════════════════════════════ */}
      {detailOpen && activeExpense && (
        <Modal
          onClose={() => setDetailOpen(false)}
          title="Expense Details"
          icon={<FileText size={18} className="text-slate-600" />}
        >
          <ExpenseDetail expense={activeExpense} onEdit={() => { setDetailOpen(false); openEdit(activeExpense); }} />
        </Modal>
      )}
    </div>
  );
};

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Category breakdown horizontal bar */
const CategoryBreakdown = ({ expenses }) => {
  const totals = {};
  expenses.forEach((e) => {
    if (!totals[e.category]) totals[e.category] = 0;
    totals[e.category] += e.amount || 0;
  });
  const grandTotal = Object.values(totals).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  if (sorted.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Spending by Category
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Top expense categories this period
          </p>
        </div>
        <span className="text-xs font-bold text-slate-500 font-mono">
          Total: ₹ {new Intl.NumberFormat("en-IN").format(grandTotal)}
        </span>
      </div>

      <div className="space-y-3">
        {sorted.map(([cat, amt]) => {
          const pct = grandTotal > 0 ? Math.round((amt / grandTotal) * 100) : 0;
          return (
            <div key={cat} className="flex items-center gap-3">
              <div className="w-36 shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-md font-bold text-[10px] border whitespace-nowrap ${getCategoryColor(
                    cat
                  )}`}
                >
                  {cat}
                </span>
              </div>
              <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="w-28 text-right">
                <span className="text-xs font-bold font-mono text-slate-800">
                  ₹ {new Intl.NumberFormat("en-IN").format(amt)}
                </span>
                <span className="text-[10px] text-slate-400 ml-1">({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Reusable modal shell */
const Modal = ({ children, onClose, title, icon, small }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    <div
      className={`bg-white rounded-3xl shadow-2xl w-full p-6 border border-slate-100 space-y-4 ${
        small ? "max-w-md" : "max-w-lg"
      }`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </h3>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 cursor-pointer transition"
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

/** Form field wrapper */
const FormField = ({ label, children }) => (
  <div>
    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
      {label}
    </label>
    {children}
  </div>
);

/** Modal action buttons */
const ModalActions = ({ onCancel, submitting, label, color = "orange" }) => {
  const colorMap = {
    orange: "bg-orange-600 hover:bg-orange-700",
    blue: "bg-blue-600 hover:bg-blue-700",
  };
  return (
    <div className="flex items-center justify-end gap-3 pt-2">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={submitting}
        className={`px-6 py-2.5 ${colorMap[color]} text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50 transition`}
      >
        {submitting ? "Saving…" : label}
      </button>
    </div>
  );
};

/** Expense detail view inside modal */
const ExpenseDetail = ({ expense, onEdit }) => {
  const sc = statusConfig[expense.status] || statusConfig.PENDING;
  return (
    <div className="space-y-4">
      {/* Status badge */}
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs border ${sc.cls}`}
      >
        <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
        {sc.label}
      </span>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-3">
        <DetailRow label="Title" value={expense.title} />
        <DetailRow
          label="Amount"
          value={`₹ ${new Intl.NumberFormat("en-IN").format(expense.amount)}`}
          mono
        />
        <DetailRow label="Category" value={expense.category} />
        <DetailRow label="Department" value={expense.department} />
        <DetailRow
          label="Expense Date"
          value={formatDate(expense.expenseDate)}
        />
        <DetailRow
          label="Budget Ref"
          value={expense.budget?.name || "General"}
        />
        <DetailRow
          label="Requested By"
          value={expense.requestedBy?.fullName || "System"}
        />
        <DetailRow
          label="Approved By"
          value={expense.approvedBy?.fullName || "—"}
        />
      </div>

      {expense.description && (
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
          <p className="text-[11px] font-bold uppercase text-slate-400 mb-1">
            Notes
          </p>
          <p className="text-xs text-slate-700">{expense.description}</p>
        </div>
      )}

      {expense.rejectionReason && (
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-3">
          <p className="text-[11px] font-bold uppercase text-rose-400 mb-1">
            Rejection Reason
          </p>
          <p className="text-xs text-rose-700">{expense.rejectionReason}</p>
        </div>
      )}

      <div className="flex justify-end pt-1">
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-blue-700 transition"
        >
          <Edit3 size={13} /> Edit Record
        </button>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, mono }) => (
  <div>
    <p className="text-[11px] font-bold uppercase text-slate-400 mb-0.5">
      {label}
    </p>
    <p
      className={`text-xs font-semibold text-slate-800 ${
        mono ? "font-mono" : ""
      }`}
    >
      {value || "—"}
    </p>
  </div>
);

// ─── Style injection (scoped form-input class) ─────────────────────────────────
const styleTag = document.createElement("style");
styleTag.textContent = `
  .form-input {
    width: 100%;
    padding: 0.625rem 0.875rem;
    background: rgb(248 250 252);
    border: 1px solid rgb(226 232 240);
    border-radius: 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    outline: none;
    transition: box-shadow 0.15s;
  }
  .form-input:focus {
    box-shadow: 0 0 0 2px rgb(249 115 22 / 0.35);
  }
`;
if (!document.head.querySelector("[data-expenses-styles]")) {
  styleTag.setAttribute("data-expenses-styles", "true");
  document.head.appendChild(styleTag);
}

export default ExpensesPage;
