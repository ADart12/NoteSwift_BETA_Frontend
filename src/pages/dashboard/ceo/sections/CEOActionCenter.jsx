import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Bell,
  FileText,
  Briefcase,
  DollarSign,
  Building2,
  Check,
  X,
  ShieldAlert,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

const CEOActionCenter = () => {
  // Pending approvals list state so CEO can interactively Approve/Reject
  const [approvals, setApprovals] = useState([
    {
      id: "APP-01",
      title: "AWS Infrastructure Upgrade",
      department: "Technology",
      amount: 840000,
      urgency: "URGENT",
      requestedBy: "Karthik Verma (CTO)",
      timeAgo: "2h ago",
      type: "Budget Approval",
      status: "pending",
    },
    {
      id: "APP-02",
      title: "Q3 Marketing Campaign",
      department: "Marketing",
      amount: 520000,
      urgency: "HIGH",
      requestedBy: "Tanvi Saxena (CMO)",
      timeAgo: "5h ago",
      type: "Expense Request",
      status: "pending",
    },
    {
      id: "APP-03",
      title: "New Office Furniture",
      department: "Operations",
      amount: 185000,
      urgency: "MEDIUM",
      requestedBy: "Meera Sen (COO)",
      timeAgo: "1d ago",
      type: "Department Request",
      status: "pending",
    },
    {
      id: "APP-04",
      title: "Sales Team Expansion",
      department: "Sales",
      amount: 1200000,
      urgency: "URGENT",
      requestedBy: "Rajesh Khanna (VP Sales)",
      timeAgo: "3h ago",
      type: "Strategic Project",
      status: "pending",
    },
    {
      id: "APP-05",
      title: "LMS Platform License",
      department: "Academics",
      amount: 360000,
      urgency: "HIGH",
      requestedBy: "Dr. Sunita Rao (Dean)",
      timeAgo: "1d ago",
      type: "Budget Approval",
      status: "pending",
    },
    {
      id: "APP-06",
      title: "HR Software Renewal",
      department: "HR",
      amount: 95000,
      urgency: "LOW",
      requestedBy: "Pooja Hegde (CHRO)",
      timeAgo: "2d ago",
      type: "Contract",
      status: "pending",
    },
    {
      id: "APP-07",
      title: "Vendor Contract Renewal",
      department: "Operations",
      amount: 620000,
      urgency: "HIGH",
      requestedBy: "Meera Sen (COO)",
      timeAgo: "6h ago",
      type: "Contract",
      status: "pending",
    },
    {
      id: "APP-08",
      title: "Team Offsite Budget",
      department: "HR",
      amount: 240000,
      urgency: "LOW",
      requestedBy: "Pooja Hegde (CHRO)",
      timeAgo: "3d ago",
      type: "Expense Request",
      status: "pending",
    },
  ]);

  const handleAction = (id, newStatus) => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // Overdue Invoices
  const overdueInvoices = [
    {
      invoiceNo: "INV-2024-089",
      amount: 124500,
      overdueDays: 15,
      client: "TechCorp Solutions",
      dueDate: "02 Nov 2026",
    },
    {
      invoiceNo: "INV-2024-091",
      amount: 89000,
      overdueDays: 8,
      client: "EduVista Academy",
      dueDate: "09 Nov 2026",
    },
    {
      invoiceNo: "INV-2024-093",
      amount: 210000,
      overdueDays: 22,
      client: "Global Skills Hub",
      dueDate: "26 Oct 2026",
    },
  ];

  // Budget Overrun Alerts
  const budgetOverruns = [
    {
      dept: "Marketing Dept",
      headline: "83% utilized with 4 months remaining",
      allocated: 4500000,
      spent: 3735000,
      burnRate: "High",
      riskNote: "Current trajectory will exhaust Q4 marketing reserve by Jan 2027.",
    },
    {
      dept: "Operations Dept",
      headline: "61% utilized, projected to overrun by ₹3.2L",
      allocated: 3800000,
      spent: 2318000,
      burnRate: "Moderate-High",
      riskNote: "Unscheduled facility repairs and office expansion added ₹4.1L cost.",
    },
  ];

  // Important Notifications
  const importantNotifications = [
    {
      id: "N-1",
      title: "Company Revenue Milestone",
      desc: "NoteSwift crossed ₹3.2 Crore YTD revenue target ahead of Q3 schedule.",
      time: "4 hours ago",
      category: "Milestone",
    },
    {
      id: "N-2",
      title: "Q3 Board Meeting Reminder",
      desc: "Quarterly Board of Directors meeting scheduled for 28 Nov 2026, 11:00 AM IST.",
      time: "1 day ago",
      category: "Governance",
    },
    {
      id: "N-3",
      title: "Annual Statutory Audit Notice",
      desc: "KPMG team beginning preliminary audit fieldwork from Monday, 24 Nov.",
      time: "2 days ago",
      category: "Compliance",
    },
    {
      id: "N-4",
      title: "New AI In EdTech Compliance Guidelines",
      desc: "Ministry of Education released revised guidelines for AI-assisted evaluations.",
      time: "3 days ago",
      category: "Regulatory",
    },
    {
      id: "N-5",
      title: "FY28 Strategic Growth Review",
      desc: "Leadership offsite for 3-year vision roadmap scheduled in Goa next month.",
      time: "4 days ago",
      category: "Strategy",
    },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "Budget Approval":
        return <DollarSign size={16} className="text-emerald-600" />;
      case "Expense Request":
        return <FileText size={16} className="text-indigo-600" />;
      case "Strategic Project":
        return <Briefcase size={16} className="text-purple-600" />;
      case "Contract":
        return <Building2 size={16} className="text-orange-600" />;
      default:
        return <Layers size={16} className="text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900">
              CEO Action Center
            </h2>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 shadow-2xs">
              <Bell size={13} className="text-amber-700 animate-bounce" />
              <span>12 items need attention</span>
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Executive governance dashboard for high-value financial authorisations, operational signoffs & risk alerts
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs">
          <Clock size={14} className="text-slate-400" />
          <span>Executive Queue: <strong>Active</strong></span>
        </div>
      </div>

      {/* Row 1: 4 Urgent Action KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Pending CEO Approvals */}
        <div className="bg-white rounded-2xl border border-amber-200/70 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full -mr-8 -mt-8 pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Bell size={22} />
          </div>
          <div className="min-w-0 relative">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Pending Approvals
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">12</h3>
            <p className="text-xs text-amber-700 font-bold mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              5 Urgent Action Required
            </p>
          </div>
        </div>

        {/* 2. Budget Requests */}
        <div className="bg-white rounded-2xl border border-indigo-200/70 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-8 -mt-8 pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
            <DollarSign size={22} />
          </div>
          <div className="min-w-0 relative">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Budget Requests
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">4</h3>
            <p className="text-xs text-indigo-600 font-semibold mt-1">
              ₹ 28.5L Total Requested
            </p>
          </div>
        </div>

        {/* 3. High-value Expenses */}
        <div className="bg-white rounded-2xl border border-rose-200/70 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full -mr-8 -mt-8 pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
            <AlertTriangle size={22} />
          </div>
          <div className="min-w-0 relative">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              High-Value Expenses
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">3</h3>
            <p className="text-xs text-rose-600 font-semibold mt-1">
              &gt; ₹ 5L each threshold
            </p>
          </div>
        </div>

        {/* 4. Contract Approvals */}
        <div className="bg-white rounded-2xl border border-orange-200/70 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -mr-8 -mt-8 pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100">
            <FileText size={22} />
          </div>
          <div className="min-w-0 relative">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Contract Approvals
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">2</h3>
            <p className="text-xs text-orange-600 font-semibold mt-1">
              Deadline within 48h
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: 2 Panels Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT PANEL: Pending Approvals (8 Items) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Pending CEO Approvals Queue
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                8 authorisations requiring executive signature
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
              5 Urgent
            </span>
          </div>

          <div className="p-5 divide-y divide-slate-100 space-y-3">
            {approvals.map((item) => (
              <div
                key={item.id}
                className={`pt-3 first:pt-0 pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                  item.status === "approved"
                    ? "opacity-60 bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100"
                    : item.status === "rejected"
                    ? "opacity-60 bg-rose-50/40 p-2.5 rounded-xl border border-rose-100 line-through"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.title}
                      </h4>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                          item.urgency === "URGENT"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : item.urgency === "HIGH"
                            ? "bg-orange-50 text-orange-700 border border-orange-200"
                            : item.urgency === "MEDIUM"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.urgency}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 flex-wrap">
                      <span className="font-semibold text-slate-700">{item.department}</span>
                      <span>•</span>
                      <span>{item.requestedBy}</span>
                      <span>•</span>
                      <span className="text-slate-400">{item.timeAgo}</span>
                    </div>
                  </div>
                </div>

                {/* Amount & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-slate-900 block">
                      ₹ {item.amount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {item.type}
                    </span>
                  </div>

                  {item.status === "pending" ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleAction(item.id, "approved")}
                        className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 flex items-center justify-center transition cursor-pointer"
                        title="Approve this request"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(item.id, "rejected")}
                        className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 flex items-center justify-center transition cursor-pointer"
                        title="Reject this request"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        item.status === "approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {item.status === "approved" ? "Approved ✓" : "Rejected ✗"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex items-center justify-between text-xs text-slate-500">
            <span>Total Value: <strong className="text-slate-900 font-mono">₹ 40,40,000</strong></span>
            <span className="text-slate-400">Digital signature logged on execution</span>
          </div>
        </div>

        {/* RIGHT PANEL: Critical Alerts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Overdue Invoice Alerts (3 Items - Red Highlight) */}
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-3 border-b border-red-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <ShieldAlert size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Overdue Invoice Alerts (3)
                  </h3>
                  <p className="text-[11px] text-red-600 font-medium">Immediate collections follow-up needed</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                ₹ 4,23,500 Total
              </span>
            </div>

            <div className="space-y-2.5 mt-3">
              {overdueInvoices.map((inv) => (
                <div
                  key={inv.invoiceNo}
                  className="p-3 rounded-xl bg-red-50/50 border border-red-100 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {inv.invoiceNo}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-100 text-red-800">
                        {inv.overdueDays}d Overdue
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">
                      {inv.client}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Due: {inv.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-red-700">
                      ₹ {inv.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Overrun Alerts (2 Items - Orange Highlight) */}
          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-3 border-b border-amber-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Budget Overrun Alerts (2)
                  </h3>
                  <p className="text-[11px] text-amber-700 font-medium">Departments approaching fiscal limits</p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 mt-3">
              {budgetOverruns.map((b) => (
                <div
                  key={b.dept}
                  className="p-3 rounded-xl bg-amber-50/50 border border-amber-100 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{b.dept}</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Burn: {b.burnRate}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-amber-900">
                    {b.headline}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    {b.riskNote}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                    <span>Allocated: ₹ {(b.allocated / 100000).toFixed(1)}L</span>
                    <span>Spent: ₹ {(b.spent / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notifications (5 Items - Info Blue) */}
          <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-3 border-b border-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Important Notifications (5)
                  </h3>
                  <p className="text-[11px] text-blue-600 font-medium">Strategic, regulatory & board updates</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-3">
              {importantNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-2.5 rounded-xl bg-blue-50/40 border border-blue-100 hover:bg-blue-50/70 transition flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                        {notif.category}
                      </span>
                      <h5 className="text-xs font-bold text-slate-800 truncate">
                        {notif.title}
                      </h5>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                      {notif.desc}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0 whitespace-nowrap">
                    {notif.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEOActionCenter;
