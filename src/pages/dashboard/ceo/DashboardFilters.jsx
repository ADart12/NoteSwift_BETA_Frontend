import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Download,
  RefreshCw,
  Bell,
  Search,
  Filter,
  X,
} from "lucide-react";

const DashboardFilters = ({ onFilterChange }) => {
  const [dateFrom, setDateFrom] = useState("2026-04-01");
  const [dateTo, setDateTo] = useState("2026-11-17");
  const [period, setPeriod] = useState("monthly");
  const [department, setDepartment] = useState("all");
  const [fiscalYear, setFiscalYear] = useState("2026-27");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, type: "urgent", text: "AWS Infrastructure budget approval pending", time: "2h ago" },
    { id: 2, type: "warning", text: "INV-2024-089 is 15 days overdue (₹1,24,500)", time: "5h ago" },
    { id: 3, type: "info", text: "November payroll processed successfully", time: "2d ago" },
    { id: 4, type: "success", text: "Monthly sales target achieved 108%", time: "2d ago" },
    { id: 5, type: "warning", text: "Marketing dept budget at 83% utilization", time: "3d ago" },
  ];

  const urgentCount = notifications.filter((n) => n.type === "urgent" || n.type === "warning").length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleExport = (format) => {
    alert(`Exporting dashboard report as ${format}...\n(Feature available in production)`);
  };

  const notifColors = {
    urgent: "bg-red-50 border-red-200 text-red-700",
    warning: "bg-amber-50 border-amber-200 text-amber-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
    success: "bg-emerald-50 border-emerald-200 text-emerald-700",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-4 py-3 flex flex-wrap items-center gap-3">
      {/* Date Range */}
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
        <Calendar size={15} className="text-slate-400 shrink-0" />
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => { setDateFrom(e.target.value); onFilterChange?.({ dateFrom: e.target.value, dateTo, period, department, fiscalYear }); }}
          className="text-xs font-semibold text-slate-700 bg-transparent border-none outline-none w-28"
        />
        <span className="text-slate-400 text-xs">→</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => { setDateTo(e.target.value); onFilterChange?.({ dateFrom, dateTo: e.target.value, period, department, fiscalYear }); }}
          className="text-xs font-semibold text-slate-700 bg-transparent border-none outline-none w-28"
        />
      </div>

      {/* Period Toggle */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
        {["monthly", "quarterly", "yearly"].map((p) => (
          <button
            key={p}
            onClick={() => { setPeriod(p); onFilterChange?.({ dateFrom, dateTo, period: p, department, fiscalYear }); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
              period === p ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Department Filter */}
      <div className="relative">
        <select
          value={department}
          onChange={(e) => { setDepartment(e.target.value); onFilterChange?.({ dateFrom, dateTo, period, department: e.target.value, fiscalYear }); }}
          className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 cursor-pointer outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="all">All Departments</option>
          <option value="academics">Academics</option>
          <option value="technology">Technology</option>
          <option value="finance">Finance</option>
          <option value="hr">Human Resources</option>
          <option value="operations">Operations</option>
          <option value="marketing">Marketing</option>
          <option value="sales">Sales</option>
        </select>
        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>

      {/* Fiscal Year Filter */}
      <div className="relative">
        <select
          value={fiscalYear}
          onChange={(e) => { setFiscalYear(e.target.value); onFilterChange?.({ dateFrom, dateTo, period, department, fiscalYear: e.target.value }); }}
          className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-slate-700 cursor-pointer outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="2026-27">FY 2026-27</option>
          <option value="2025-26">FY 2025-26</option>
          <option value="2024-25">FY 2024-25</option>
        </select>
        <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="relative">
        {searchOpen ? (
          <div className="flex items-center gap-2 bg-slate-50 border border-indigo-300 rounded-xl px-3 py-2 w-56 ring-2 ring-indigo-100">
            <Search size={14} className="text-slate-400 shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Search dashboard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-xs font-medium text-slate-700 bg-transparent outline-none placeholder:text-slate-400"
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-slate-400 hover:text-slate-600 cursor-pointer">
              <X size={13} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <Search size={14} />
            <span>Search</span>
          </button>
        )}
      </div>

      {/* Export Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl px-3 py-2 text-xs font-semibold hover:bg-indigo-100 transition cursor-pointer">
          <Download size={14} />
          <span>Export</span>
          <ChevronDown size={12} />
        </button>
        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 w-36 z-50 hidden group-hover:block">
          <button onClick={() => handleExport("PDF")} className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
            Export as PDF
          </button>
          <button onClick={() => handleExport("Excel")} className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
            Export as Excel
          </button>
          <button onClick={() => handleExport("CSV")} className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
            Export as CSV
          </button>
        </div>
      </div>

      {/* Refresh */}
      <button
        onClick={handleRefresh}
        className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
      >
        <RefreshCw size={14} className={isRefreshing ? "animate-spin text-indigo-600" : ""} />
        <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
      </button>

      {/* Notifications Bell */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative flex items-center justify-center w-9 h-9 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition cursor-pointer"
        >
          <Bell size={16} className="text-slate-600" />
          {urgentCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {urgentCount}
            </span>
          )}
        </button>

        {notifOpen && (
          <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl w-80 z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-800">Notifications</h4>
              <button onClick={() => setNotifOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={15} />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
              {notifications.map((n) => (
                <div key={n.id} className={`mx-3 my-2 p-3 rounded-xl border text-xs font-medium ${notifColors[n.type]}`}>
                  <p>{n.text}</p>
                  <p className="mt-1 opacity-60 text-[11px]">{n.time}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-slate-100">
              <button className="text-xs text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer">View all notifications →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardFilters;
