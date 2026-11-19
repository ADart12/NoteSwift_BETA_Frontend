import React from "react";
import {
  Megaphone,
  Target,
  TrendingUp,
  Percent,
  BarChart3,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  Users,
  Compass,
  Layers,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MarketingPerformance = () => {
  // Campaign-wise Leads (7 campaigns)
  const campaignLeadsData = [
    { campaign: "Google Ads Q4", shortName: "Google Ads", leads: 320, rate: 28, cost: 448000, cpl: 1400, roi: "320%", conversions: 90 },
    { campaign: "LinkedIn B2B", shortName: "LinkedIn", leads: 185, rate: 34, cost: 370000, cpl: 2000, roi: "380%", conversions: 63 },
    { campaign: "Instagram Reels", shortName: "Instagram", leads: 240, rate: 22, cost: 288000, cpl: 1200, roi: "290%", conversions: 53 },
    { campaign: "Email Newsletter", shortName: "Email", leads: 128, rate: 41, cost: 102400, cpl: 800, roi: "490%", conversions: 52 },
    { campaign: "YouTube Tutorial", shortName: "YouTube", leads: 195, rate: 18, cost: 312000, cpl: 1600, roi: "260%", conversions: 35 },
    { campaign: "Referral Program", shortName: "Referral", leads: 143, rate: 38, cost: 157300, cpl: 1100, roi: "440%", conversions: 54 },
    { campaign: "SEO Organic", shortName: "SEO", leads: 73, rate: 15, cost: 142300, cpl: 1950, roi: "210%", conversions: 11 },
  ];

  // Campaign conversion rate for horizontal bar chart
  const campaignConversionData = [
    { campaign: "Email Newsletter", rate: 41 },
    { campaign: "Referral Program", rate: 38 },
    { campaign: "LinkedIn B2B", rate: 34 },
    { campaign: "Google Ads Q4", rate: 28 },
    { campaign: "Instagram Reels", rate: 22 },
    { campaign: "YouTube Tutorial", rate: 18 },
    { campaign: "SEO Organic", rate: 15 },
  ];

  // Cost per lead breakdown
  const cplData = [
    { channel: "Email Newsletter", cpl: 800, color: "bg-emerald-500", rating: "Lowest Cost" },
    { channel: "Referral Program", cpl: 1100, color: "bg-teal-500", rating: "High ROI" },
    { channel: "Instagram Reels", cpl: 1200, color: "bg-pink-500", rating: "High Volume" },
    { channel: "Google Ads Q4", cpl: 1400, color: "bg-indigo-500", rating: "High Intent" },
    { channel: "YouTube Tutorial", cpl: 1600, color: "bg-amber-500", rating: "Long Tail" },
    { channel: "SEO Organic", cpl: 1950, color: "bg-cyan-500", rating: "Compound" },
    { channel: "LinkedIn B2B", cpl: 2000, color: "bg-blue-600", rating: "Enterprise" },
  ];

  const formatCurrency = (val) => `₹ ${val.toLocaleString("en-IN")}`;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Marketing Performance (CMO)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Omni-channel acquisition, customer acquisition cost & campaign ROI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200 flex items-center gap-1.5">
            <Sparkles size={14} />
            Chief Marketing Officer: Meera Nair
          </span>
        </div>
      </div>

      {/* Row 1: 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Campaigns */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
            <Megaphone size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Active Campaigns
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              7
            </h3>
            <p className="text-xs text-violet-600 font-semibold mt-1">
              Across 5 ad networks
            </p>
          </div>
        </div>

        {/* Card 2: Total Leads Generated */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <Target size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Leads Generated
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              1,284
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              This quarter inflow
            </p>
          </div>
        </div>

        {/* Card 3: Marketing Expenses */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <DollarSign size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Marketing Expenses
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹ 18,20,000
            </h3>
            <p className="text-xs text-rose-600 font-semibold mt-1">
              Q3 Media & Creative spend
            </p>
          </div>
        </div>

        {/* Card 4: Marketing ROI */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Percent size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Marketing ROI
            </p>
            <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">
              340%
            </h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <ArrowUpRight size={14} />
              <span>↑ 22% ROI uplift</span>
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: 2 Charts Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Campaign-wise Leads (BarChart) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Campaign-wise Leads
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Lead volume per individual promotional campaign
              </p>
            </div>
            <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
              1,284 Leads
            </span>
          </div>
          <div className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={campaignLeadsData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="shortName"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(val) => [`${val} Leads`, "Volume"]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="leads" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT: Campaign Conversion Rate (BarChart Horizontal) */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Campaign Conversion Rate
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Percentage of captured leads converted to paying students
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              Up to 41%
            </span>
          </div>
          <div className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                layout="vertical"
                data={campaignConversionData}
                margin={{ top: 5, right: 25, left: 25, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="campaign"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  width={110}
                />
                <Tooltip
                  formatter={(val) => [`${val}%`, "Conversion Rate"]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="rate" fill="#06b6d4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: 2 Panels (Campaign Details Table & Cost Per Lead Analysis) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Campaign Details Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">
              Campaign Performance Details
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive unit economics across all 7 marketing initiatives
            </p>
          </div>
          <div className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pr-2">Campaign</th>
                    <th className="pb-3 px-1.5 text-center">Leads</th>
                    <th className="pb-3 px-1.5 text-center">Conversions</th>
                    <th className="pb-3 px-1.5 text-right">Cost</th>
                    <th className="pb-3 px-1.5 text-right">CPL</th>
                    <th className="pb-3 pl-1.5 text-right">ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {campaignLeadsData.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 pr-2 font-semibold text-slate-800 truncate max-w-[130px]">
                        {c.campaign}
                      </td>
                      <td className="py-3 px-1.5 text-center font-mono font-semibold text-slate-800">
                        {c.leads}
                      </td>
                      <td className="py-3 px-1.5 text-center font-mono text-slate-600">
                        {c.conversions}
                      </td>
                      <td className="py-3 px-1.5 font-mono text-slate-600 text-right">
                        ₹{(c.cost / 1000).toFixed(0)}k
                      </td>
                      <td className="py-3 px-1.5 font-mono font-bold text-slate-900 text-right">
                        ₹{c.cpl}
                      </td>
                      <td className="py-3 pl-1.5 text-right">
                        <span className="font-mono font-bold text-emerald-600">
                          {c.roi}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT: Cost per Lead Analysis Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Cost per Lead (CPL) Analysis
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Channel acquisition cost benchmarks
                </p>
              </div>
              <BarChart3 size={18} className="text-slate-400" />
            </div>

            <div className="p-5 space-y-4">
              {/* Avg CPL Summary Banner */}
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-indigo-700">
                    Average Cost per Lead (CPL)
                  </p>
                  <h4 className="text-2xl font-bold font-mono text-indigo-950 mt-1">
                    ₹ 1,418
                  </h4>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    -14% vs Q2
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">Target: &lt; ₹1,600</p>
                </div>
              </div>

              {/* Channel CPL breakdown bars */}
              <div className="space-y-2.5">
                {cplData.map((item, idx) => {
                  const maxCPL = 2200;
                  const percentWidth = Math.min(100, (item.cpl / maxCPL) * 100);
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700 truncate">
                          {item.channel}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-slate-400">
                            {item.rating}
                          </span>
                          <span className="font-mono font-bold text-slate-900">
                            ₹{item.cpl}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`${item.color} h-1.5 rounded-full transition-all duration-500`}
                          style={{ width: `${percentWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Marketing Funnel Visualization */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Marketing Acquisition Funnel
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              End-to-end customer journey progression from initial impression to paid enrollment
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            3.4% Full Funnel Velocity
          </span>
        </div>

        {/* Simple 4-stage funnel using CSS widths */}
        <div className="pt-6 max-w-3xl mx-auto space-y-3">
          {/* Stage 1: Awareness */}
          <div className="flex flex-col items-center">
            <div className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl p-3.5 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-indigo-200" />
                <span className="text-sm font-bold">1. Awareness (Impressions & Reach)</span>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono">12,400</span>
                <span className="text-xs text-indigo-200 ml-1.5 font-medium">(100%)</span>
              </div>
            </div>
            <div className="w-px h-3 bg-slate-300" />
          </div>

          {/* Stage 2: Interest */}
          <div className="flex flex-col items-center">
            <div
              className="w-[85%] bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl p-3.5 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-cyan-200" />
                <span className="text-sm font-bold">2. Interest (Site Visitors & Clicks)</span>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono">4,820</span>
                <span className="text-xs text-cyan-100 ml-1.5 font-medium">(38.9%)</span>
              </div>
            </div>
            <div className="w-px h-3 bg-slate-300" />
          </div>

          {/* Stage 3: Consideration */}
          <div className="flex flex-col items-center">
            <div
              className="w-[65%] bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-xl p-3.5 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Target size={18} className="text-violet-200" />
                <span className="text-sm font-bold">3. Consideration (Leads Captured)</span>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono">1,284</span>
                <span className="text-xs text-violet-100 ml-1.5 font-medium">(26.6%)</span>
              </div>
            </div>
            <div className="w-px h-3 bg-slate-300" />
          </div>

          {/* Stage 4: Conversion */}
          <div className="flex flex-col items-center">
            <div
              className="w-[45%] bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl p-3.5 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-200" />
                <span className="text-sm font-bold">4. Conversion (Paid Enrolled)</span>
              </div>
              <div className="text-right">
                <span className="text-base font-bold font-mono">423</span>
                <span className="text-xs text-emerald-100 ml-1.5 font-medium">(32.9%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingPerformance;
