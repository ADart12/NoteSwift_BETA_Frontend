import { useState, useEffect, useCallback } from "react";
import {
  Wallet,
  Coins,
  TrendingUp,
  Building2,
  Plus,
  Search,
  Filter,
  Calendar,
  Edit3,
  Trash2,
  PlusCircle,
  X,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  getBudgets,
  getBudgetStats,
  createBudget,
  updateBudget,
  addFunds,
  deleteBudget,
  getDepartmentList,
} from "../../services/budgetService";
import toast from "react-hot-toast";

const BudgetPage = () => {
  // Data state
  const [budgets, setBudgets] = useState([]);
  const [stats, setStats] = useState({
    totalBudget: 5000000,
    totalSpent: 1840000,
    budgetBalance: 3160000,
    utilizationPercentage: 36.8,
    remainingPercentage: 63.2,
    departmentCount: 7,
    departmentAllocations: [],
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Filters
  const [selectedFiscalYear, setSelectedFiscalYear] = useState("FY 2026-27");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Selected Budget for modal operations
  const [activeBudget, setActiveBudget] = useState(null);

  // Form states
  const [createForm, setCreateForm] = useState({
    name: "",
    department: "",
    allocatedAmount: "",
    fiscalYear: "FY 2026-27",
    description: "",
    startDate: "2026-04-01",
    endDate: "2027-03-31",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    allocatedAmount: "",
    description: "",
    status: "approved",
  });

  const [topUpAmount, setTopUpAmount] = useState("");

  // Number formatter
  const formatINR = (val) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  // Fetch all budgets and stats
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [budgetsRes, statsRes, deptRes] = await Promise.all([
        getBudgets({
          fiscalYear: selectedFiscalYear,
          department: selectedDepartment,
          status: selectedStatus,
          search: searchQuery,
        }),
        getBudgetStats(selectedFiscalYear),
        getDepartmentList(),
      ]);

      if (budgetsRes?.data) {
        setBudgets(budgetsRes.data);
      }
      if (statsRes?.data) {
        setStats(statsRes.data);
      }
      if (Array.isArray(deptRes)) {
        setDepartments(deptRes);
        if (deptRes.length > 0 && !createForm.department) {
          setCreateForm((prev) => ({ ...prev, department: deptRes[0]._id }));
        }
      }
    } catch (err) {
      console.error("Error loading budget data:", err);
      toast.error("Could not load latest budget data. Using offline metrics.");
    } finally {
      setLoading(false);
    }
  }, [selectedFiscalYear, selectedDepartment, selectedStatus, searchQuery, createForm.department]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handlers
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.name || !createForm.allocatedAmount || !createForm.department) {
      toast.error("Please fill in budget name, department, and allocated amount.");
      return;
    }

    try {
      setSubmitting(true);
      await createBudget(createForm);
      toast.success(`Budget "${createForm.name}" created successfully!`);
      setCreateModalOpen(false);
      setCreateForm({
        name: "",
        department: departments[0]?._id || "",
        allocatedAmount: "",
        fiscalYear: selectedFiscalYear,
        description: "",
        startDate: "2026-04-01",
        endDate: "2027-03-31",
      });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create budget.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditOpen = (budget) => {
    setActiveBudget(budget);
    setEditForm({
      name: budget.name,
      allocatedAmount: budget.allocatedAmount,
      description: budget.description || "",
      status: budget.status || "approved",
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!activeBudget) return;

    try {
      setSubmitting(true);
      await updateBudget(activeBudget._id, editForm);
      toast.success(`Budget "${editForm.name}" updated successfully!`);
      setEditModalOpen(false);
      setActiveBudget(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update budget.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTopUpOpen = (budget) => {
    setActiveBudget(budget);
    setTopUpAmount("");
    setTopUpModalOpen(true);
  };

  const handleTopUpSubmit = async (e) => {
    e.preventDefault();
    if (!activeBudget || !topUpAmount) {
      toast.error("Please enter a valid amount.");
      return;
    }

    try {
      setSubmitting(true);
      await addFunds(activeBudget._id, Number(topUpAmount));
      toast.success(
        `Added ₹ ${formatINR(topUpAmount)} to "${activeBudget.name}"!`
      );
      setTopUpModalOpen(false);
      setActiveBudget(null);
      setTopUpAmount("");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add funds.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteOpen = (budget) => {
    setActiveBudget(budget);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!activeBudget) return;
    try {
      setSubmitting(true);
      await deleteBudget(activeBudget._id);
      toast.success(`Budget "${activeBudget.name}" deleted.`);
      setDeleteModalOpen(false);
      setActiveBudget(null);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete budget.");
    } finally {
      setSubmitting(false);
    }
  };

  // Color helper for department tag
  const getDeptColorClass = (code) => {
    switch (String(code).toUpperCase()) {
      case "TECH":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "OPS":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "MKT":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "HR":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "FIN":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "SAL":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "ACAD":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* =========================================================================
          TOP HEADER: Title, Subtitle, Fiscal Year Selector & Primary CTA
      ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Budget Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
              FIN
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Department: Finance (FIN) • Annual & Departmental Capital Allocations
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Refresh Button */}
          <button
            onClick={fetchData}
            title="Refresh budget data"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition shadow-2xs cursor-pointer"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          {/* Fiscal Year Selector */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 shadow-2xs">
            <Calendar size={15} className="text-slate-400" />
            <select
              value={selectedFiscalYear}
              onChange={(e) => setSelectedFiscalYear(e.target.value)}
              className="bg-transparent outline-none cursor-pointer font-sans"
            >
              <option value="FY 2026-27">FY 2026-27</option>
              <option value="FY 2025-26">FY 2025-26</option>
              <option value="FY 2024-25">FY 2024-25</option>
            </select>
          </div>

          {/* Create Budget Button */}
          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <Plus size={16} />
            <span>Allocate New Budget</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          ROW 1: 4 CAPITAL OVERVIEW METRIC CARDS
      ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Budget */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Wallet size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Total Budget Allocated</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹ {formatINR(stats.totalBudget)}
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">
              {stats.fiscalYear || selectedFiscalYear}
            </p>
          </div>
        </div>

        {/* Card 2: Total Expenses */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Coins size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Total Disbursed / Spent</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹ {formatINR(stats.totalSpent)}
            </h3>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-0.5">
              <span>↓</span>
              <span>{stats.utilizationPercentage}% utilized</span>
            </p>
          </div>
        </div>

        {/* Card 3: Available Balance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <TrendingUp size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Available Capital Balance</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹ {formatINR(stats.budgetBalance)}
            </h3>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>{stats.remainingPercentage}% available</span>
            </p>
          </div>
        </div>

        {/* Card 4: Allocated Departments */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Building2 size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">Active Allocations</p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              {stats.departmentCount || budgets.length} Sectors
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              Enterprise Organizational Divisions
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: DEPARTMENT ENVELOPES OVERVIEW (Interactive Cards)
      ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Departmental Capital Envelopes
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time expenditure tracking and remaining balance per sector
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Overall Capital Utilization:{" "}
            <span className="font-mono font-bold text-blue-600">
              {stats.utilizationPercentage}%
            </span>
          </div>
        </div>

        {/* Department Envelopes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {budgets.map((b) => {
            const deptCode = b.department?.code || "GEN";
            const deptName = b.department?.name || "General";
            const util = b.utilizationPercentage || 0;
            const isHighUtil = util > 75;

            return (
              <div
                key={b._id}
                className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition shadow-2xs flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${getDeptColorClass(
                        deptCode
                      )}`}
                    >
                      {deptCode} • {deptName}
                    </span>
                    <span className="text-[11px] font-bold font-mono text-slate-700">
                      {util}%
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 mt-2 truncate" title={b.name}>
                    {b.name}
                  </h4>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, util)}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHighUtil ? "bg-amber-500" : "bg-blue-600"
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Allocated:</span>
                    <span className="font-mono font-bold text-slate-800">
                      ₹ {formatINR(b.allocatedAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Spent:</span>
                    <span className="font-mono font-bold text-slate-700">
                      ₹ {formatINR(b.spentAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Balance:</span>
                    <span className="font-mono font-bold text-emerald-600">
                      ₹ {formatINR(b.remainingAmount)}
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleTopUpOpen(b)}
                      title="Add Funds"
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle size={13} />
                      <span>Top-Up</span>
                    </button>
                    <button
                      onClick={() => handleEditOpen(b)}
                      title="Edit Allocation"
                      className="p-1 text-slate-600 hover:bg-slate-100 rounded-md transition text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          ROW 3: COMPREHENSIVE BUDGET TABLE WITH SEARCH & FILTERS
      ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        {/* Table Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search budgets by name, department, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
              <Filter size={13} className="text-slate-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-semibold text-xs"
              >
                <option value="all">All Departments</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.code} - {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-semibold text-xs"
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 pr-3">Budget Title & Scope</th>
                <th className="py-3.5 px-3">Department</th>
                <th className="py-3.5 px-3">Fiscal Year</th>
                <th className="py-3.5 px-3">Allocated</th>
                <th className="py-3.5 px-3">Spent</th>
                <th className="py-3.5 px-3">Available Balance</th>
                <th className="py-3.5 px-3">Utilization</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 pl-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-400 font-medium">
                    Loading budget records...
                  </td>
                </tr>
              ) : budgets.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-400 font-medium">
                    No budget allocations found matching the current criteria.
                  </td>
                </tr>
              ) : (
                budgets.map((b) => {
                  const deptCode = b.department?.code || "GEN";
                  const util = b.utilizationPercentage || 0;

                  return (
                    <tr key={b._id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 pr-3">
                        <p className="font-bold text-slate-900">{b.name}</p>
                        <p className="text-[11px] text-slate-400 truncate max-w-xs">
                          {b.description || "General capital envelope"}
                        </p>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold text-[11px] border ${getDeptColorClass(
                            deptCode
                          )}`}
                        >
                          {deptCode}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-slate-500">
                        {b.fiscalYear}
                      </td>
                      <td className="py-3.5 px-3 font-bold font-mono text-slate-900 whitespace-nowrap">
                        ₹ {formatINR(b.allocatedAmount)}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-slate-600 whitespace-nowrap">
                        ₹ {formatINR(b.spentAmount)}
                      </td>
                      <td className="py-3.5 px-3 font-bold font-mono text-emerald-600 whitespace-nowrap">
                        ₹ {formatINR(b.remainingAmount)}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              style={{ width: `${Math.min(100, util)}%` }}
                              className={`h-full rounded-full ${
                                util > 75 ? "bg-amber-500" : "bg-blue-600"
                              }`}
                            />
                          </div>
                          <span className="font-mono text-[11px] text-slate-600 font-bold">
                            {util}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] capitalize ${
                            b.status === "approved"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {b.status || "approved"}
                        </span>
                      </td>
                      <td className="py-3.5 pl-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleTopUpOpen(b)}
                            title="Quick Top-Up"
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                          >
                            <PlusCircle size={15} />
                          </button>
                          <button
                            onClick={() => handleEditOpen(b)}
                            title="Edit Allocation"
                            className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteOpen(b)}
                            title="Delete Budget"
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

      {/* =========================================================================
          MODAL 1: CREATE / ALLOCATE NEW BUDGET
      ========================================================================= */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Plus size={18} className="text-blue-600" />
                <span>Allocate New Department Budget</span>
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Budget Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Q4 Cloud Infrastructure & Security"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Department
                  </label>
                  <select
                    value={createForm.department}
                    onChange={(e) => setCreateForm({ ...createForm, department: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {departments.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.code} - {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Fiscal Year
                  </label>
                  <input
                    type="text"
                    value={createForm.fiscalYear}
                    onChange={(e) => setCreateForm({ ...createForm, fiscalYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Allocation Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 500000"
                  value={createForm.allocatedAmount}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, allocatedAmount: e.target.value })
                  }
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Purpose / Description
                </label>
                <textarea
                  placeholder="Strategic explanation for this capital allocation..."
                  rows="2"
                  value={createForm.description}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Allocating..." : "Allocate Budget"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: EDIT BUDGET ALLOCATION
      ========================================================================= */}
      {editModalOpen && activeBudget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Edit3 size={18} className="text-blue-600" />
                <span>Adjust Budget Allocation</span>
              </h3>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Budget Title
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Allocated Capital (₹)
                </label>
                <input
                  type="number"
                  value={editForm.allocatedAmount}
                  onChange={(e) =>
                    setEditForm({ ...editForm, allocatedAmount: e.target.value })
                  }
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-[11px] text-slate-400 mt-1 font-mono">
                  Currently Spent: ₹ {formatINR(activeBudget.spentAmount)}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Status
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: QUICK TOP-UP / ADD FUNDS
      ========================================================================= */}
      {topUpModalOpen && activeBudget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <PlusCircle size={18} className="text-emerald-600" />
                <span>Quick Capital Top-Up</span>
              </h3>
              <button
                onClick={() => setTopUpModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Inject additional funds into{" "}
              <strong className="text-slate-800">"{activeBudget.name}"</strong>
            </p>

            <form onSubmit={handleTopUpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Amount to Add (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 100000"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {[50000, 100000, 250000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTopUpAmount(String(amt))}
                    className="py-1.5 px-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg text-xs font-mono font-bold transition"
                  >
                    +₹ {formatINR(amt)}
                  </button>
                ))}
              </div>

              {topUpAmount && (
                <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl text-xs text-emerald-800 space-y-1">
                  <div className="flex justify-between">
                    <span>New Total:</span>
                    <span className="font-mono font-bold">
                      ₹ {formatINR((activeBudget.allocatedAmount || 0) + Number(topUpAmount))}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setTopUpModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Adding..." : "Confirm Top-Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: DELETE CONFIRMATION
      ========================================================================= */}
      {deleteModalOpen && activeBudget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 border border-slate-100 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle size={24} />
            </div>

            <h3 className="font-bold text-slate-900 text-base">
              Delete Budget Allocation?
            </h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to remove{" "}
              <strong className="text-slate-800">"{activeBudget.name}"</strong>? This will soft-delete the budget record.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={submitting}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
