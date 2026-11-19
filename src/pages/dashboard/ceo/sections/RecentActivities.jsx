import { useState, useMemo } from "react";
import {
  UserPlus,
  BookOpen,
  GraduationCap,
  ShoppingCart,
  Wallet,
  Receipt,
  GitBranch,
  Building2,
  AlertTriangle,
  CreditCard,
  Clock,
  Filter,
  Search,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const RecentActivities = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filterTabs = [
    "All",
    "Employees",
    "Courses",
    "Enrollments",
    "Sales",
    "Budget",
    "Expenses",
    "Projects",
    "Departments",
  ];

  // 25 activities with exact details from specifications
  const activities = [
    {
      id: 1,
      type: "Employee",
      filterCategory: "Employees",
      title: "New Employee Joined",
      desc: "Rohan Kapoor joined as Frontend Developer",
      department: "Technology",
      timestamp: "2h ago",
    },
    {
      id: 2,
      type: "Course",
      filterCategory: "Courses",
      title: "New Course Published",
      desc: "'Machine Learning Fundamentals' published with live lab environment",
      department: "Academics",
      timestamp: "3h ago",
    },
    {
      id: 3,
      type: "Enrollment",
      filterCategory: "Enrollments",
      title: "New Enrollment Cohort",
      desc: "85 new students enrolled in 'Full Stack Dev' cohort",
      department: "Academics",
      timestamp: "4h ago",
    },
    {
      id: 4,
      type: "Sales",
      filterCategory: "Sales",
      title: "Sales Order Won",
      desc: "₹2,40,000 corporate upskilling deal closed with TechCorp Solutions",
      department: "Sales",
      timestamp: "5h ago",
    },
    {
      id: 5,
      type: "Budget",
      filterCategory: "Budget",
      title: "Budget Approved",
      desc: "₹8,40,000 AWS Infrastructure budget approved for scale-up",
      department: "Finance",
      timestamp: "6h ago",
    },
    {
      id: 6,
      type: "Expense",
      filterCategory: "Expenses",
      title: "Expense Submitted",
      desc: "₹45,000 team offsite expense submitted by HR for approval",
      department: "HR",
      timestamp: "7h ago",
    },
    {
      id: 7,
      type: "Project",
      filterCategory: "Projects",
      title: "Project Status Update",
      desc: "'LMS v3.0' moved to Testing & QA phase on staging",
      department: "Technology",
      timestamp: "8h ago",
    },
    {
      id: 8,
      type: "Department",
      filterCategory: "Departments",
      title: "Department Update",
      desc: "Marketing Q4 campaign launched successfully across Google and Meta",
      department: "Marketing",
      timestamp: "9h ago",
    },
    {
      id: 9,
      type: "Employee",
      filterCategory: "Employees",
      title: "New Employee Joined",
      desc: "Priya Sharma joined as Data Scientist in AI lab",
      department: "Technology",
      timestamp: "10h ago",
    },
    {
      id: 10,
      type: "Course",
      filterCategory: "Courses",
      title: "Course Updated",
      desc: "'Python for Beginners' curriculum updated to v2.1 with new exercises",
      department: "Academics",
      timestamp: "11h ago",
    },
    {
      id: 11,
      type: "Enrollment",
      filterCategory: "Enrollments",
      title: "Enrollment Milestone",
      desc: "2000th student milestone reached with enrollment of Himesh Roy",
      department: "Academics",
      timestamp: "12h ago",
    },
    {
      id: 12,
      type: "Sales",
      filterCategory: "Sales",
      title: "Sales Pipeline Updated",
      desc: "15 new enterprise leads added from Google Ads campaign",
      department: "Sales",
      timestamp: "1d ago",
    },
    {
      id: 13,
      type: "Sales",
      filterCategory: "Sales",
      title: "Invoice Raised",
      desc: "INV-2024-095 of ₹1,85,000 issued to EduVista Academy",
      department: "Finance",
      timestamp: "1d ago",
    },
    {
      id: 14,
      type: "Employee",
      filterCategory: "Employees",
      title: "Leave Approved",
      desc: "Annual leave for Anjali Singh approved for 5 days",
      department: "HR",
      timestamp: "1d ago",
    },
    {
      id: 15,
      type: "Project",
      filterCategory: "Projects",
      title: "Project Completed",
      desc: "'Mobile App v2.0' released to Apple App Store & Google Play",
      department: "Technology",
      timestamp: "1d ago",
    },
    {
      id: 16,
      type: "Course",
      filterCategory: "Courses",
      title: "New Course Draft",
      desc: "'DevOps Fundamentals' course draft created and in review",
      department: "Academics",
      timestamp: "2d ago",
    },
    {
      id: 17,
      type: "Payroll",
      filterCategory: "Budget",
      title: "Payroll Processed",
      desc: "November 2026 payroll processed ₹12,50,000 for 87 employees",
      department: "Finance",
      timestamp: "2d ago",
    },
    {
      id: 18,
      type: "Department",
      filterCategory: "Departments",
      title: "Vendor Added",
      desc: "New vendor 'CloudHost Pro' onboarded for server infrastructure",
      department: "Operations",
      timestamp: "2d ago",
    },
    {
      id: 19,
      type: "Sales",
      filterCategory: "Sales",
      title: "Sales Target Met",
      desc: "Monthly sales target achieved 108% ahead of month-end",
      department: "Sales",
      timestamp: "2d ago",
    },
    {
      id: 20,
      type: "Budget",
      filterCategory: "Budget",
      title: "Budget Rejected",
      desc: "₹5,20,000 marketing campaign budget rejected by CEO for revision",
      department: "Finance",
      timestamp: "3d ago",
    },
    {
      id: 21,
      type: "Alert",
      filterCategory: "Employees",
      title: "Attendance Alert",
      desc: "3 employees absent without prior leave notification",
      department: "HR",
      timestamp: "3d ago",
    },
    {
      id: 22,
      type: "Department",
      filterCategory: "Departments",
      title: "New Department Goal",
      desc: "Operations set Q3 cost reduction target of 10% on vendor contracts",
      department: "Operations",
      timestamp: "3d ago",
    },
    {
      id: 23,
      type: "Course",
      filterCategory: "Courses",
      title: "Course Completed",
      desc: "'Data Analytics' Cohort 8 completed with 94% graduation rate",
      department: "Academics",
      timestamp: "4d ago",
    },
    {
      id: 24,
      type: "Expense",
      filterCategory: "Expenses",
      title: "Expense Approved",
      desc: "Travel reimbursement ₹18,600 approved by Finance Manager",
      department: "Finance",
      timestamp: "4d ago",
    },
    {
      id: 25,
      type: "Sales",
      filterCategory: "Sales",
      title: "Lead Campaign Success",
      desc: "LinkedIn B2B campaign generated 185 qualified enterprise leads",
      department: "Marketing",
      timestamp: "5d ago",
    },
  ];

  // Helper config for visual icons and theme badges
  const getActivityMeta = (type) => {
    switch (type) {
      case "Employee":
        return {
          icon: UserPlus,
          bg: "bg-indigo-50",
          text: "text-indigo-600",
          border: "border-indigo-100",
        };
      case "Course":
        return {
          icon: BookOpen,
          bg: "bg-cyan-50",
          text: "text-cyan-600",
          border: "border-cyan-100",
        };
      case "Enrollment":
        return {
          icon: GraduationCap,
          bg: "bg-emerald-50",
          text: "text-emerald-600",
          border: "border-emerald-100",
        };
      case "Sales":
        return {
          icon: ShoppingCart,
          bg: "bg-green-50",
          text: "text-green-600",
          border: "border-green-100",
        };
      case "Budget":
        return {
          icon: Wallet,
          bg: "bg-amber-50",
          text: "text-amber-600",
          border: "border-amber-100",
        };
      case "Expense":
        return {
          icon: Receipt,
          bg: "bg-orange-50",
          text: "text-orange-600",
          border: "border-orange-100",
        };
      case "Project":
        return {
          icon: GitBranch,
          bg: "bg-purple-50",
          text: "text-purple-600",
          border: "border-purple-100",
        };
      case "Department":
        return {
          icon: Building2,
          bg: "bg-blue-50",
          text: "text-blue-600",
          border: "border-blue-100",
        };
      case "Alert":
        return {
          icon: AlertTriangle,
          bg: "bg-rose-50",
          text: "text-rose-600",
          border: "border-rose-100",
        };
      case "Payroll":
        return {
          icon: CreditCard,
          bg: "bg-slate-100",
          text: "text-slate-600",
          border: "border-slate-200",
        };
      default:
        return {
          icon: Sparkles,
          bg: "bg-slate-50",
          text: "text-slate-600",
          border: "border-slate-100",
        };
    }
  };

  // Filtered Activities
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchesTab =
        activeTab === "All" ||
        act.filterCategory === activeTab ||
        (activeTab === "Budget" && act.type === "Payroll") ||
        (activeTab === "Employees" && act.type === "Alert");

      const matchesSearch =
        searchQuery.trim() === "" ||
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.department.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Recent Company Activities
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Live Audit Log
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time chronological events, approvals, HR records, sales deals, and operational changes
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs">
          <Clock size={14} className="text-slate-400" />
          <span>Showing <strong>{filteredActivities.length}</strong> of 25 Events</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Activity Feed List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-800">
              Activity Stream
            </h3>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              {activeTab}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-medium">Auto-synced with company database</span>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs font-medium">
            No activities matching current filter criteria.
          </div>
        ) : (
          <div className="space-y-3.5 divide-y divide-slate-100">
            {filteredActivities.map((act) => {
              const meta = getActivityMeta(act.type);
              const IconComp = meta.icon;

              return (
                <div
                  key={act.id}
                  className="pt-3.5 first:pt-0 flex items-start justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    {/* Colored Icon Circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${meta.bg} ${meta.text} ${meta.border} group-hover:scale-105 transition-transform`}
                    >
                      <IconComp size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {act.title}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {act.department}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {act.desc}
                      </p>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <span className="text-[11px] font-medium font-mono text-slate-400 shrink-0 whitespace-nowrap mt-1">
                    {act.timestamp}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>End of recent 25 log entries</span>
          <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
            Download Complete Audit Trail (.csv)
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;
