import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import DashboardFilters from "./ceo/DashboardFilters";
import { getExecutiveOverview } from "../../services/ceoDashboardService";

// ========================= Section Imports =========================
import ExecutiveOverview from "./ceo/sections/ExecutiveOverview";
import FinancialOverview from "./ceo/sections/FinancialOverview";
import DepartmentPerformance from "./ceo/sections/DepartmentPerformance";
import AcademicPerformance from "./ceo/sections/AcademicPerformance";
import SalesPerformance from "./ceo/sections/SalesPerformance";
import MarketingPerformance from "./ceo/sections/MarketingPerformance";
import HROverview from "./ceo/sections/HROverview";
import OperationsOverview from "./ceo/sections/OperationsOverview";
import TechnologyOverview from "./ceo/sections/TechnologyOverview";
import CEOActionCenter from "./ceo/sections/CEOActionCenter";
import StrategicGoals from "./ceo/sections/StrategicGoals";
import ReportsAnalytics from "./ceo/sections/ReportsAnalytics";
import RecentActivities from "./ceo/sections/RecentActivities";

import {
  LayoutDashboard,
  Wallet,
  Building2,
  GraduationCap,
  ShoppingCart,
  Megaphone,
  Users,
  Package,
  Code2,
  CheckCircle2,
  Target,
  FileBarChart,
  Activity,
  Crown,
  Bell,
  TrendingUp,
} from "lucide-react";

// ========================= Base Tab Config =========================
const BASE_TABS = [
  { id: "executive",    label: "Executive Overview",       icon: LayoutDashboard, component: ExecutiveOverview,    badge: null },
  { id: "financial",   label: "Financial Overview",        icon: Wallet,          component: FinancialOverview,   badge: null },
  { id: "departments", label: "Department Performance",    icon: Building2,       component: DepartmentPerformance, badge: null },
  { id: "academic",    label: "Academic Performance",      icon: GraduationCap,   component: AcademicPerformance, badge: null },
  { id: "sales",       label: "Sales Performance",         icon: ShoppingCart,    component: SalesPerformance,    badge: null },
  { id: "marketing",   label: "Marketing Performance",     icon: Megaphone,       component: MarketingPerformance,badge: null },
  { id: "hr",          label: "Human Resources",           icon: Users,           component: HROverview,          badge: null },
  { id: "operations",  label: "Operations Overview",       icon: Package,         component: OperationsOverview,  badge: null },
  { id: "technology",  label: "Technology Overview",       icon: Code2,           component: TechnologyOverview,  badge: null },
  { id: "actions",     label: "CEO Action Center",         icon: CheckCircle2,    component: CEOActionCenter,     badge: "12" },
  { id: "goals",       label: "Strategic Goals",           icon: Target,          component: StrategicGoals,      badge: null },
  { id: "reports",     label: "Reports & Analytics",       icon: FileBarChart,    component: ReportsAnalytics,    badge: null },
  { id: "activities",  label: "Recent Activities",         icon: Activity,        component: RecentActivities,    badge: null },
];

// ========================= CEO Dashboard =========================
const CEODashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("executive");
  const [filters, setFilters] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [headerStats, setHeaderStats] = useState({
    ytdRevenue: "₹ 0",
    activeStudents: "0",
    pendingActions: 0,
    deptPerformance: "0%",
  });

  // Fetch live stats from backend
  const fetchHeaderMetrics = useCallback(async () => {
    try {
      const res = await getExecutiveOverview(filters);
      if (res?.success && res?.data?.headerStats) {
        setHeaderStats(res.data.headerStats);
      }
    } catch (err) {
      console.warn("Could not fetch CEO header metrics, using fallback:", err.message);
    }
  }, [filters]);

  useEffect(() => {
    fetchHeaderMetrics();
  }, [fetchHeaderMetrics]);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = useMemo(() => {
    const h = currentTime.getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  }, [currentTime]);

  const formattedDate = useMemo(() =>
    currentTime.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    [currentTime]
  );

  const formattedTime = useMemo(() =>
    currentTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    [currentTime]
  );

  // Tabs with dynamic action badge
  const tabs = useMemo(() => {
    return BASE_TABS.map((tab) => {
      if (tab.id === "actions") {
        return {
          ...tab,
          badge: headerStats.pendingActions > 0 ? String(headerStats.pendingActions) : null,
        };
      }
      return tab;
    });
  }, [headerStats.pendingActions]);

  const ActiveSection = tabs.find((t) => t.id === activeTab)?.component;

  return (
    <div className="space-y-5 pb-10">
      {/* ======================= HEADER ======================= */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-6 shadow-lg">
        {/* Background decorative circles */}
        <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-10 -left-6 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-4 right-32 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Crown Badge */}
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0 shadow-inner border border-white/20">
              <Crown size={28} className="text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest">CEO Command Center</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-300 font-semibold">Live Enterprise</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {greeting}, {user?.fullName?.split(" ")[0]} 👋
              </h1>
              <p className="text-sm text-indigo-200 mt-1 font-medium">
                NoteSwift EdTech · Executive Dashboard · FY 2026-27
              </p>
            </div>
          </div>

          <div className="text-right text-white shrink-0">
            <p className="text-sm font-medium text-indigo-200">{formattedDate}</p>
            <p className="text-3xl font-bold font-mono tracking-wide mt-1">{formattedTime}</p>
            <p className="text-xs text-indigo-300 mt-1 font-medium">IST · UTC+5:30</p>
          </div>
        </div>

        {/* Quick KPI strip (Live from Backend) */}
        <div className="relative mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "YTD Revenue", value: headerStats.ytdRevenue, icon: TrendingUp, up: true },
            { label: "Active Students", value: headerStats.activeStudents, icon: GraduationCap, up: true },
            { label: "Pending Actions", value: headerStats.pendingActions, icon: Bell, up: false },
            { label: "Dept. Performance", value: headerStats.deptPerformance, icon: Target, up: true },
          ].map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/15 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] text-indigo-200 font-semibold">{kpi.label}</p>
                  <p className="text-base font-bold text-white font-mono">{kpi.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================= FILTERS BAR ======================= */}
      <DashboardFilters onFilterChange={setFilters} />

      {/* ======================= TAB NAVIGATION ======================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="flex items-stretch min-w-max border-b border-slate-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-3.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border-b-2 ${
                    isActive
                      ? "border-indigo-600 text-indigo-700 bg-indigo-50/60"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-indigo-600" : "text-slate-400"} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="ml-0.5 px-1.5 py-0.5 bg-red-500 text-white rounded-full text-[10px] font-bold leading-none">
                      {tab.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================= SECTION CONTENT ======================= */}
        <div className="p-6 bg-slate-50/50 min-h-96">
          {ActiveSection ? (
            <ActiveSection filters={filters} />
          ) : (
            <div className="flex items-center justify-center h-64 text-slate-400 font-medium">
              Section not found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CEODashboard;
