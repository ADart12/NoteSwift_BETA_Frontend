import { useState } from "react";
import {
  Package,
  CheckSquare,
  Wrench,
  Building2,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  Truck,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
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
  Legend,
  ResponsiveContainer,
} from "recharts";

const OperationsOverview = () => {
  // Operational Expenses (BarChart) - 6 months Jun-Nov
  // Categories: Utilities, Rent, Equipment, Maintenance, Travel
  const operationalExpensesData = [
    { month: "Jun", Utilities: 45000, Rent: 180000, Equipment: 95000, Maintenance: 25000, Travel: 35000 },
    { month: "Jul", Utilities: 52000, Rent: 180000, Equipment: 60000, Maintenance: 32000, Travel: 42000 },
    { month: "Aug", Utilities: 48000, Rent: 180000, Equipment: 120000, Maintenance: 28000, Travel: 38000 },
    { month: "Sep", Utilities: 50000, Rent: 180000, Equipment: 85000, Maintenance: 30000, Travel: 55000 },
    { month: "Oct", Utilities: 47000, Rent: 180000, Equipment: 140000, Maintenance: 35000, Travel: 48000 },
    { month: "Nov", Utilities: 49000, Rent: 180000, Equipment: 110000, Maintenance: 22000, Travel: 40000 },
  ];

  // Asset Category Distribution (PieChart):
  // Laptops 45, Monitors 38, Phones 32, Furniture 85, Vehicles 8, Others 76 = 284 Total
  const assetCategoryData = [
    { name: "Furniture", value: 85, color: "#6366f1" },
    { name: "Others", value: 76, color: "#06b6d4" },
    { name: "Laptops", value: 45, color: "#22c55e" },
    { name: "Monitors", value: 38, color: "#f59e0b" },
    { name: "Phones", value: 32, color: "#ec4899" },
    { name: "Vehicles", value: 8, color: "#a855f7" },
  ];

  // Active Projects table - 6 rows (Project, Lead, Team, Start, Deadline, Progress%, Status)
  const activeProjects = [
    {
      id: "OP-01",
      project: "Bangalore HQ Expansion & Ergonomics",
      lead: "Meera Sen",
      team: "Facilities & HR",
      start: "01 Sep 2026",
      deadline: "30 Nov 2026",
      progress: 88,
      status: "On Track",
    },
    {
      id: "OP-02",
      project: "IT Asset Refresh (M3 Pro Laptops)",
      lead: "Karthik Verma",
      team: "IT Ops",
      start: "15 Oct 2026",
      deadline: "25 Nov 2026",
      progress: 65,
      status: "At Risk",
    },
    {
      id: "OP-03",
      project: "Vendor Contract Digitalization",
      lead: "Rohan Deshmukh",
      team: "Procurement",
      start: "01 Aug 2026",
      deadline: "10 Nov 2026",
      progress: 45,
      status: "Delayed",
    },
    {
      id: "OP-04",
      project: "Noida Co-working Center Setup",
      lead: "Vikram Malhotra",
      team: "Admin Ops",
      start: "20 Sep 2026",
      deadline: "15 Dec 2026",
      progress: 72,
      status: "On Track",
    },
    {
      id: "OP-05",
      project: "Warehouse & Inventory ERP Migration",
      lead: "Sandeep Nair",
      team: "Supply & Logistics",
      start: "10 Jul 2026",
      deadline: "05 Nov 2026",
      progress: 58,
      status: "Delayed",
    },
    {
      id: "OP-06",
      project: "Green Campus & Solar Power Audit",
      lead: "Ananya Iyer",
      team: "Facilities",
      start: "01 Nov 2026",
      deadline: "31 Jan 2027",
      progress: 30,
      status: "On Track",
    },
  ];

  // Pending Operational Requests list (8 items)
  // Types: Equipment Request, Maintenance, Vendor Payment, Asset Transfer
  const pendingRequests = [
    {
      id: "REQ-301",
      type: "Equipment Request",
      requester: "Aarav Sharma",
      dept: "Technology",
      priority: "High",
      timeAgo: "2 hours ago",
      desc: "Dell 4K Ultrasharp Monitor for Senior Dev",
    },
    {
      id: "REQ-302",
      type: "Vendor Payment",
      requester: "Tek Raj Bhatt",
      dept: "Finance",
      priority: "Urgent",
      timeAgo: "3 hours ago",
      desc: "CloudHost Pro invoice clearance (₹65,000)",
    },
    {
      id: "REQ-303",
      type: "Maintenance",
      requester: "Sunita Rao",
      dept: "Academics",
      priority: "Medium",
      timeAgo: "5 hours ago",
      desc: "Studio 2 HVAC air-conditioning servicing",
    },
    {
      id: "REQ-304",
      type: "Asset Transfer",
      requester: "Rajesh Khanna",
      dept: "Sales",
      priority: "Low",
      timeAgo: "1 day ago",
      desc: "Transfer 4 iPads from Mumbai field unit to Pune",
    },
    {
      id: "REQ-305",
      type: "Equipment Request",
      requester: "Tanvi Saxena",
      dept: "Marketing",
      priority: "High",
      timeAgo: "1 day ago",
      desc: "Sony Alpha 7IV camera kit for content studio",
    },
    {
      id: "REQ-306",
      type: "Maintenance",
      requester: "Pooja Hegde",
      dept: "HR",
      priority: "Low",
      timeAgo: "2 days ago",
      desc: "Biometric attendance scanner terminal 2 recalibration",
    },
    {
      id: "REQ-307",
      type: "Vendor Payment",
      requester: "Meera Sen",
      dept: "Operations",
      priority: "Urgent",
      timeAgo: "2 days ago",
      desc: "CleanPro Facilities monthly retainer (₹1,20,000)",
    },
    {
      id: "REQ-308",
      type: "Asset Transfer",
      requester: "Karthik Verma",
      dept: "Technology",
      priority: "Medium",
      timeAgo: "3 days ago",
      desc: "Server rack reallocation to testing lab",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Operations Overview (COO)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Operations Active
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Physical & digital asset logistics, vendor contracts, project execution, and facilities
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs">
          <Clock size={14} className="text-slate-400" />
          <span>Real-time Operational Telemetry</span>
        </div>
      </div>

      {/* Row 1: 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Assets */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Package size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Assets
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">284</h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              ↑ 12 new items this month
            </p>
          </div>
        </div>

        {/* 2. Available Assets */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckSquare size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Available Assets
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">198</h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              69.7% in ready pool
            </p>
          </div>
        </div>

        {/* 3. Assigned Assets */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Assigned Assets
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">71</h3>
            <p className="text-xs text-blue-600 font-semibold mt-1">
              Allocated to staff & labs
            </p>
          </div>
        </div>

        {/* 4. Under Maintenance */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Wrench size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Maintenance
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">15</h3>
            <p className="text-xs text-amber-600 font-semibold mt-1">
              5.2% of total fleet
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: 2 more KPI Cards + 2 Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Vendors */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Building2 size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Vendors
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              24
            </h3>
            <p className="text-xs text-purple-600 font-semibold mt-1">
              Active: 18 onboarded
            </p>
          </div>
        </div>

        {/* Card 2: Active Projects */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={22} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Active Projects
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              6
            </h3>
            <p className="text-xs text-rose-600 font-semibold mt-1">
              Delayed: 2 need action
            </p>
          </div>
        </div>

        {/* Panel 1: Asset Health & SLA Summary */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Asset Health Index
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              94.8%
            </span>
          </div>
          <div className="my-2">
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "94.8%" }} />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            269 of 284 assets fully operational without defects
          </p>
        </div>

        {/* Panel 2: Operational Facilities Summary */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Active Facilities
            </span>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
              3 Centers
            </span>
          </div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 my-1">
            <span>Bengaluru HQ</span>
            <span className="text-slate-400">•</span>
            <span>Noida Hub</span>
            <span className="text-slate-400">•</span>
            <span>Pune Lab</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <ShieldCheck size={13} /> 100% compliant with fire & safety norms
          </p>
        </div>
      </div>

      {/* Row 3: 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Operational Expenses (BarChart) - 6 months Jun-Nov */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Operational Expenses by Category (Jun - Nov 2026)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Monthly cost breakdown: Utilities, Rent, Equipment, Maintenance & Travel
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                Avg: ₹ 4.05L/mo
              </span>
            </div>
          </div>

          <div className="mt-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={operationalExpensesData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val, name) => [`₹ ${val.toLocaleString("en-IN")}`, name]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                <Bar dataKey="Rent" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Equipment" stackId="a" fill="#06b6d4" />
                <Bar dataKey="Utilities" stackId="a" fill="#22c55e" />
                <Bar dataKey="Travel" stackId="a" fill="#f59e0b" />
                <Bar dataKey="Maintenance" stackId="a" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
            <span>Fixed Rent: <strong className="text-slate-800 font-mono">₹ 1,80,000/mo</strong></span>
            <span>Equipment Peak: <strong className="text-slate-800 font-mono">₹ 1.40L (Oct)</strong></span>
            <span>Nov Total: <strong className="text-indigo-600 font-mono">₹ 4,01,000</strong></span>
          </div>
        </div>

        {/* RIGHT: Asset Category Distribution (PieChart) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Asset Category Distribution
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">284 Total Assets categorized</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
              6 Categories
            </span>
          </div>

          <div className="mt-4">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={assetCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {assetCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val} Units (${((val / 284) * 100).toFixed(1)}%)`, name]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-xs">
            {assetCategoryData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 truncate">{item.name}:</span>
                <span className="font-bold font-mono text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: 2 Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Active Projects Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Active Operations Projects
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                6 operational roadmap initiatives underway
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
              4 On Track / 2 Delayed
            </span>
          </div>

          <div className="p-5 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pr-2">Project</th>
                  <th className="pb-3 px-2">Lead</th>
                  <th className="pb-3 px-2">Deadline</th>
                  <th className="pb-3 px-2">Progress</th>
                  <th className="pb-3 pl-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {activeProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 pr-2">
                      <span className="font-bold text-slate-800 block truncate max-w-[200px]" title={p.project}>
                        {p.project}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{p.team}</span>
                    </td>
                    <td className="py-3.5 px-2 font-medium text-slate-700 whitespace-nowrap">
                      {p.lead}
                    </td>
                    <td className="py-3.5 px-2 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                      {p.deadline}
                    </td>
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              p.status === "Delayed"
                                ? "bg-red-500"
                                : p.status === "At Risk"
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-slate-800 text-[11px]">
                          {p.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 pl-2 text-right whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          p.status === "On Track"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : p.status === "At Risk"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Pending Operational Requests list (8 items) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Pending Operational Requests
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">8 internal requests awaiting fulfillment</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full border border-rose-200">
              2 Urgent
            </span>
          </div>

          <div className="p-5 max-h-[380px] overflow-y-auto space-y-3">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-100 transition flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        req.type === "Equipment Request"
                          ? "bg-blue-50 text-blue-700"
                          : req.type === "Maintenance"
                          ? "bg-purple-50 text-purple-700"
                          : req.type === "Vendor Payment"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {req.type}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        req.priority === "Urgent"
                          ? "bg-red-100 text-red-700"
                          : req.priority === "High"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {req.priority}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-1 truncate">
                    {req.desc}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {req.requester} • <span className="font-semibold">{req.dept}</span>
                  </p>
                </div>

                <span className="text-[10px] text-slate-400 font-medium shrink-0 whitespace-nowrap mt-1">
                  {req.timeAgo}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Avg Resolution: <strong>24 hrs</strong></span>
            <button className="text-indigo-600 font-bold hover:text-indigo-700 cursor-pointer flex items-center gap-1">
              <span>View All Requests</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsOverview;
