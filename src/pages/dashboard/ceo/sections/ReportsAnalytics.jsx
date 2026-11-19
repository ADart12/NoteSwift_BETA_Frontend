import { useState } from "react";
import {
  FileText,
  BarChart2,
  PieChart,
  Users,
  GraduationCap,
  TrendingUp,
  FileBarChart,
  Receipt,
  Target,
  Briefcase,
  Download,
  Eye,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Send,
  X,
} from "lucide-react";

const ReportsAnalytics = () => {
  const [previewModal, setPreviewModal] = useState(null);
  const [downloadToast, setDownloadToast] = useState(null);

  // Form state for Schedule Report
  const [scheduleForm, setScheduleForm] = useState({
    reportType: "Monthly Financial Report",
    frequency: "Monthly",
    email: "ceo@noteswift.com",
    format: "PDF",
  });
  const [scheduledSuccess, setScheduledSuccess] = useState(false);

  // 10 Reports
  const reports = [
    {
      id: "rep-01",
      name: "Monthly Financial Report",
      color: "emerald",
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200",
      icon: TrendingUp,
      desc: "Revenue, expenses, profit analysis for current month",
      lastGenerated: "01 Nov 2026",
      fileSize: "2.4 MB",
      format: "PDF & XLSX",
    },
    {
      id: "rep-02",
      name: "Quarterly Financial Report",
      color: "indigo",
      iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-200",
      icon: BarChart2,
      desc: "Q2 FY 2026-27 comprehensive financial performance",
      lastGenerated: "01 Oct 2026",
      fileSize: "4.8 MB",
      format: "PDF",
    },
    {
      id: "rep-03",
      name: "Annual Financial Report",
      color: "blue",
      iconBg: "bg-blue-50 text-blue-600 border border-blue-200",
      icon: FileText,
      desc: "Full year P&L, balance sheet, cash flow",
      lastGenerated: "01 Apr 2026",
      fileSize: "8.1 MB",
      format: "PDF & Audited Report",
    },
    {
      id: "rep-04",
      name: "Department Performance Report",
      color: "violet",
      iconBg: "bg-purple-50 text-purple-600 border border-purple-200",
      icon: Target,
      desc: "Cross-department KPI comparison and analysis",
      lastGenerated: "05 Nov 2026",
      fileSize: "3.2 MB",
      format: "PDF",
    },
    {
      id: "rep-05",
      name: "Employee Overview Report",
      color: "pink",
      iconBg: "bg-pink-50 text-pink-600 border border-pink-200",
      icon: Users,
      desc: "Headcount, attendance, leave, payroll summary",
      lastGenerated: "01 Nov 2026",
      fileSize: "1.9 MB",
      format: "PDF & CSV",
    },
    {
      id: "rep-06",
      name: "Student Enrollment Report",
      color: "cyan",
      iconBg: "bg-cyan-50 text-cyan-600 border border-cyan-200",
      icon: GraduationCap,
      desc: "Enrollment trends, cohort analysis, completion rates",
      lastGenerated: "10 Nov 2026",
      fileSize: "3.7 MB",
      format: "PDF",
    },
    {
      id: "rep-07",
      name: "Sales Performance Report",
      color: "orange",
      iconBg: "bg-orange-50 text-orange-600 border border-orange-200",
      icon: FileBarChart,
      desc: "Pipeline, conversion, revenue by rep and course",
      lastGenerated: "07 Nov 2026",
      fileSize: "2.1 MB",
      format: "PDF & XLSX",
    },
    {
      id: "rep-08",
      name: "Expense Report",
      color: "rose",
      iconBg: "bg-rose-50 text-rose-600 border border-rose-200",
      icon: Receipt,
      desc: "Department-wise expense breakdown and approvals",
      lastGenerated: "03 Nov 2026",
      fileSize: "1.6 MB",
      format: "PDF",
    },
    {
      id: "rep-09",
      name: "Budget Utilization Report",
      color: "amber",
      iconBg: "bg-amber-50 text-amber-600 border border-amber-200",
      icon: PieChart,
      desc: "Budget vs actual spending per department",
      lastGenerated: "01 Nov 2026",
      fileSize: "2.8 MB",
      format: "PDF",
    },
    {
      id: "rep-10",
      name: "Project Performance Report",
      color: "teal",
      iconBg: "bg-teal-50 text-teal-600 border border-teal-200",
      icon: Briefcase,
      desc: "All active/completed projects status and timelines",
      lastGenerated: "08 Nov 2026",
      fileSize: "3.0 MB",
      format: "PDF",
    },
  ];

  const handleExport = (reportName) => {
    setDownloadToast(`Generating and exporting "${reportName}" as PDF...`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 3000);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    setScheduledSuccess(true);
    setTimeout(() => {
      setScheduledSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Reports & Analytics
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              10 Executive Briefs
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Automated executive intelligence packages, downloadable PDFs, and automated recurring delivery
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs">
          <Calendar size={14} className="text-slate-400" />
          <span>Last Batch Run: <strong>01 Nov 2026</strong></span>
        </div>
      </div>

      {/* Download Toast Notification */}
      {downloadToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{downloadToast}</span>
          </div>
          <button
            onClick={() => setDownloadToast(null)}
            className="text-emerald-600 hover:text-emerald-800 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 10 Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reports.map((r) => {
          const IconComp = r.icon;
          return (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon + Format */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${r.iconBg}`}>
                    <IconComp size={22} />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    {r.fileSize}
                  </span>
                </div>

                {/* Report Info */}
                <h3 className="text-base font-bold text-slate-900 mt-4 group-hover:text-indigo-600 transition-colors">
                  {r.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {r.desc}
                </p>
              </div>

              {/* Bottom metadata and action buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>Last Generated:</span>
                  <span className="font-mono text-slate-600 font-semibold">{r.lastGenerated}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setPreviewModal(r)}
                    className="py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Eye size={13} className="text-slate-500" />
                    <span>Preview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExport(r.name)}
                    className="py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Download size={13} className="text-indigo-600" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule Report Panel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Mail size={18} className="text-indigo-600" />
              <span>Schedule Recurring Executive Report Delivery</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Automate weekly or monthly digest distribution directly to board members and executive inbox
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200 self-start sm:self-auto">
            Automated Cron Engine
          </span>
        </div>

        {scheduledSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Recurring report schedule successfully activated for {scheduleForm.email}!</span>
          </div>
        )}

        <form onSubmit={handleScheduleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* 1. Report Type Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Select Report Type
            </label>
            <div className="relative">
              <select
                value={scheduleForm.reportType}
                onChange={(e) => setScheduleForm({ ...scheduleForm, reportType: e.target.value })}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
              >
                {reports.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* 2. Frequency Dropdown */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Frequency
            </label>
            <div className="relative">
              <select
                value={scheduleForm.frequency}
                onChange={(e) => setScheduleForm({ ...scheduleForm, frequency: e.target.value })}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
              >
                <option value="Daily">Daily (08:00 AM IST)</option>
                <option value="Weekly">Weekly (Every Monday)</option>
                <option value="Monthly">Monthly (1st of Month)</option>
                <option value="Quarterly">Quarterly</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* 3. Email Recipient Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Email Recipient
            </label>
            <input
              type="email"
              value={scheduleForm.email}
              onChange={(e) => setScheduleForm({ ...scheduleForm, email: e.target.value })}
              placeholder="e.g. ceo@noteswift.com"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* 4. Schedule Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
            >
              <Send size={14} />
              <span>Schedule Report</span>
            </button>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {previewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">{previewModal.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModal(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <p><strong>Description:</strong> {previewModal.desc}</p>
                <p><strong>Last Generated:</strong> {previewModal.lastGenerated}</p>
                <p><strong>Estimated Size:</strong> {previewModal.fileSize}</p>
                <p><strong>Supported Format:</strong> {previewModal.format}</p>
              </div>

              <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 text-indigo-900">
                <p className="font-semibold mb-1">Executive Summary Snapshot:</p>
                <p className="text-[11px] leading-relaxed">
                  This report provides a consolidated breakdown of NoteSwift EdTech Pvt. Ltd. performance across active cohorts, revenue accruals, and department milestones for FY 2026-27. All figures are verified by internal finance controls.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPreviewModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  handleExport(previewModal.name);
                  setPreviewModal(null);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;
