import React from "react";
import {
  Users,
  FolderGit2,
  CheckSquare,
  Wallet,
  Award,
  Activity,
  Briefcase,
  ChevronRight,
} from "lucide-react";

const DepartmentPerformance = () => {
  const departments = [
    {
      id: "academics",
      name: "Academics",
      headTitle: "CAO",
      headName: "Priya Sharma",
      status: "Active",
      employees: 18,
      projects: 5,
      tasks: 8,
      budget: "₹ 85,00,000",
      utilization: 68,
      performance: 87,
      headerGradient: "from-indigo-500 to-indigo-600",
      barColor: "bg-indigo-500",
      performanceGrade: "Excellent · High Completion Rate",
    },
    {
      id: "technology",
      name: "Technology",
      headTitle: "CTO",
      headName: "Rahul Verma",
      status: "Active",
      employees: 15,
      projects: 8,
      tasks: 23,
      budget: "₹ 60,00,000",
      utilization: 72,
      performance: 82,
      headerGradient: "from-cyan-500 to-cyan-600",
      barColor: "bg-cyan-500",
      performanceGrade: "Very Good · LMS V2 Rollout",
    },
    {
      id: "finance",
      name: "Finance",
      headTitle: "CFO",
      headName: "Tek Raj Bhatt",
      status: "Active",
      employees: 6,
      projects: 3,
      tasks: 5,
      budget: "₹ 25,00,000",
      utilization: 44,
      performance: 91,
      headerGradient: "from-emerald-500 to-emerald-600",
      barColor: "bg-emerald-500",
      performanceGrade: "Outstanding · Zero Audit Variance",
    },
    {
      id: "hr",
      name: "Human Resources",
      headTitle: "CHRO",
      headName: "Anjali Singh",
      status: "Active",
      employees: 8,
      projects: 4,
      tasks: 11,
      budget: "₹ 20,00,000",
      utilization: 55,
      performance: 85,
      headerGradient: "from-pink-500 to-pink-600",
      barColor: "bg-pink-500",
      performanceGrade: "Great · High Employee Retention",
    },
    {
      id: "operations",
      name: "Operations",
      headTitle: "COO",
      headName: "Suresh Patel",
      status: "Active",
      employees: 12,
      projects: 6,
      tasks: 14,
      budget: "₹ 30,00,000",
      utilization: 61,
      performance: 78,
      headerGradient: "from-orange-500 to-orange-600",
      barColor: "bg-orange-500",
      performanceGrade: "Good · Infrastructure Expansion",
    },
    {
      id: "marketing",
      name: "Marketing",
      headTitle: "CMO",
      headName: "Meera Nair",
      status: "Active",
      employees: 10,
      projects: 5,
      tasks: 9,
      budget: "₹ 22,00,000",
      utilization: 83,
      performance: 79,
      headerGradient: "from-violet-500 to-violet-600",
      barColor: "bg-violet-500",
      performanceGrade: "Good · High Q4 Lead Volume",
    },
    {
      id: "sales",
      name: "Sales",
      headTitle: "CCO",
      headName: "Vikram Reddy",
      status: "Active",
      employees: 18,
      projects: 4,
      tasks: 16,
      budget: "₹ 28,00,000",
      utilization: 76,
      performance: 84,
      headerGradient: "from-blue-500 to-blue-600",
      barColor: "bg-blue-500",
      performanceGrade: "Very Good · Target Achieved",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Department Performance
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Departmental headcount, budget burn, active projects & efficiency
            ratings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            7 / 7 Active Departments
          </span>
        </div>
      </div>

      {/* 7 Department Cards in Grid (lg:grid-cols-2 gap-6) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Colored Header Bar */}
            <div
              className={`bg-gradient-to-r ${dept.headerGradient} text-white p-5 flex items-center justify-between`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <Briefcase size={20} className="text-white/80" />
                  <h3 className="text-lg font-bold tracking-tight text-white">
                    {dept.name}
                  </h3>
                </div>
                <p className="text-xs text-white/90 font-medium mt-1">
                  {dept.headTitle}: {dept.headName}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-xs text-white border border-white/30 shadow-2xs">
                {dept.status}
              </span>
            </div>

            {/* Card Body with 2-Column Info Grid */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* 1. Total Employees */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Users size={14} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider">
                      Staff
                    </span>
                  </div>
                  <h4 className="text-xl font-bold font-mono text-slate-900 mt-1">
                    {dept.employees}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Active team</p>
                </div>

                {/* 2. Active Projects */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <FolderGit2 size={14} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider">
                      Projects
                    </span>
                  </div>
                  <h4 className="text-xl font-bold font-mono text-slate-900 mt-1">
                    {dept.projects}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Ongoing</p>
                </div>

                {/* 3. Pending Tasks */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <CheckSquare size={14} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider">
                      Tasks
                    </span>
                  </div>
                  <h4 className="text-xl font-bold font-mono text-slate-900 mt-1">
                    {dept.tasks}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Pending</p>
                </div>

                {/* 4. Department Budget */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 sm:col-span-2">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Wallet size={14} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider">
                      Department Budget
                    </span>
                  </div>
                  <h4 className="text-lg font-bold font-mono text-slate-900 mt-1">
                    {dept.budget}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    FY 2026-27 Allocated
                  </p>
                </div>

                {/* 5. Department Status */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Activity size={14} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider">
                      Status
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Operational
                    </span>
                  </div>
                </div>
              </div>

              {/* Budget Utilization Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600">Budget Utilization</span>
                  <span className="font-mono text-slate-900">
                    {dept.utilization}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`${dept.barColor} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${dept.utilization}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0%</span>
                  <span>{100 - dept.utilization}% Available</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Performance Meter */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Award size={15} className="text-amber-500" />
                    <span className="text-xs font-bold text-slate-800">
                      Performance Score
                    </span>
                  </div>
                  <span className="text-base font-extrabold font-mono text-slate-900">
                    {dept.performance}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${dept.performance}%` }}
                  />
                </div>
                <p className="text-[11px] font-medium text-slate-500 italic">
                  {dept.performanceGrade}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentPerformance;
