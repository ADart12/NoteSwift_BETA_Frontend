import { useState, useEffect, useCallback, useRef } from "react";
import {
  FileText, IndianRupee, CheckCircle2, Clock, AlertTriangle,
  Plus, Search, Filter, Edit3, Trash2, X, RefreshCw,
  ArrowUpRight, Ban, CreditCard, Eye, Download, ChevronDown,
  Printer, Package, Calendar, Building2,
} from "lucide-react";
import {
  getInvoices, createInvoice, updateInvoice,
  recordPayment, cancelInvoice, deleteInvoice,
} from "../../services/invoiceService";
import { getBudgets } from "../../services/budgetService";
import toast from "react-hot-toast";

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════

const PAYMENT_METHODS = ["Bank_Transfer", "Cash", "Card", "UPI", "Cheque", "Other"];

const STATUS_CFG = {
  Draft:          { label: "Draft",          dot: "bg-slate-400",   cls: "bg-slate-50 text-slate-600 border-slate-200" },
  Issued:         { label: "Issued",          dot: "bg-blue-500",    cls: "bg-blue-50 text-blue-700 border-blue-200" },
  Partially_Paid: { label: "Partially Paid",  dot: "bg-indigo-500",  cls: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  Paid:           { label: "Paid",            dot: "bg-emerald-500", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  Overdue:        { label: "Overdue",         dot: "bg-rose-500",    cls: "bg-rose-50 text-rose-700 border-rose-200" },
  Cancelled:      { label: "Cancelled",       dot: "bg-orange-400",  cls: "bg-orange-50 text-orange-700 border-orange-200" },
};

const TYPE_CFG = {
  Payable:    { cls: "bg-amber-50 text-amber-700 border-amber-200" },
  Receivable: { cls: "bg-teal-50 text-teal-700 border-teal-200" },
};

const EMPTY_LINE = () => ({ description: "", quantity: 1, unitPrice: "" });

const EMPTY_FORM = () => ({
  clientName: "", clientEmail: "", clientPhone: "", clientAddress: "", clientGST: "",
  type: "Payable", department: "Finance",
  lineItems: [EMPTY_LINE()],
  taxRate: 18, discount: 0,
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: "",
  paymentMethod: "Bank_Transfer", transactionReference: "",
  notes: "", internalNotes: "",
  budget: "", status: "Issued",
});

// ═══════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════

const fmtINR = (v) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(v || 0);
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const isOverdue = (inv) => inv.status !== "Paid" && inv.status !== "Cancelled" && inv.dueDate && new Date() > new Date(inv.dueDate);

const computeLine = (l) => ((Number(l.quantity) || 0) * (Number(l.unitPrice) || 0));
const computeTotals = (lineItems, taxRate, discount) => {
  const subtotal  = lineItems.reduce((s, l) => s + computeLine(l), 0);
  const taxAmount = (subtotal * Number(taxRate || 0)) / 100;
  const total     = Math.max(0, subtotal + taxAmount - Number(discount || 0));
  return { subtotal, taxAmount, total };
};

// ═══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

const InvoicesPage = () => {
  const [invoices, setInvoices]     = useState([]);
  const [budgets, setBudgets]       = useState([]);
  const [stats, setStats]           = useState({ total: 0, totalAmount: 0, paidAmount: 0, outstanding: 0, overdue: 0, overdueAmount: 0 });
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Filters
  const [searchQ, setSearchQ]           = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType]     = useState("all");
  const [filterMonth, setFilterMonth]   = useState("all");

  // Modals
  const [createOpen, setCreateOpen]   = useState(false);
  const [editOpen, setEditOpen]       = useState(false);
  const [detailOpen, setDetailOpen]   = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [deleteOpen, setDeleteOpen]   = useState(false);

  const [active, setActive]   = useState(null);
  const [form, setForm]       = useState(EMPTY_FORM());
  const [editForm, setEditForm] = useState({});
  const [payForm, setPayForm] = useState({ amount: "", paymentMethod: "Bank_Transfer", transactionReference: "", paidDate: new Date().toISOString().split("T")[0] });

  // ── Fetch ─────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [invRes, budgetRes] = await Promise.all([
        getInvoices({}),
        getBudgets({}),
      ]);
      setInvoices(invRes?.data || []);
      setStats(invRes?.stats  || {});
      setBudgets(budgetRes?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Could not load invoices.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Filtered list ──────────────────────────────────────────────────
  const filtered = invoices.filter((inv) => {
    const q = searchQ.toLowerCase();
    const matchQ = !q || inv.invoiceNumber?.toLowerCase().includes(q) || inv.clientName?.toLowerCase().includes(q) || inv.department?.toLowerCase().includes(q);
    const matchSt = filterStatus === "all" || inv.status === filterStatus;
    const matchTy = filterType   === "all" || inv.type   === filterType;
    let matchM = true;
    if (filterMonth !== "all" && inv.issueDate) {
      const d = new Date(inv.issueDate);
      matchM = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}` === filterMonth;
    }
    return matchQ && matchSt && matchTy && matchM;
  });

  const monthOptions = Array.from(new Set(
    invoices.filter(i => i.issueDate).map(i => {
      const d = new Date(i.issueDate);
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
    })
  )).sort((a,b) => b.localeCompare(a));

  // ── Create ─────────────────────────────────────────────────────────
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.clientName || !form.dueDate || form.lineItems.every(l => !l.description)) {
      toast.error("Client name, due date, and at least one line item are required."); return;
    }
    try {
      setSubmitting(true);
      const res = await createInvoice({ ...form, budget: form.budget || undefined });
      toast.success(`${res.data?.invoiceNumber} created!`);
      setCreateOpen(false); setForm(EMPTY_FORM()); fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create invoice.");
    } finally { setSubmitting(false); }
  };

  // ── Edit ───────────────────────────────────────────────────────────
  const openEdit = (inv) => {
    setActive(inv);
    setEditForm({
      clientName: inv.clientName, clientEmail: inv.clientEmail || "", clientPhone: inv.clientPhone || "",
      clientAddress: inv.clientAddress || "", clientGST: inv.clientGST || "",
      type: inv.type, department: inv.department,
      lineItems: inv.lineItems?.length ? inv.lineItems.map(l => ({ ...l })) : [EMPTY_LINE()],
      taxRate: inv.taxRate ?? 18, discount: inv.discount ?? 0,
      issueDate: inv.issueDate ? new Date(inv.issueDate).toISOString().split("T")[0] : "",
      dueDate:   inv.dueDate   ? new Date(inv.dueDate).toISOString().split("T")[0]   : "",
      paymentMethod: inv.paymentMethod, transactionReference: inv.transactionReference || "",
      notes: inv.notes || "", internalNotes: inv.internalNotes || "",
      budget: inv.budget?._id || inv.budget || "", status: inv.status,
    });
    setEditOpen(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!active) return;
    try {
      setSubmitting(true);
      await updateInvoice(active._id, { ...editForm, budget: editForm.budget || undefined });
      toast.success("Invoice updated.");
      setEditOpen(false); setActive(null); fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update invoice.");
    } finally { setSubmitting(false); }
  };

  // ── Payment ────────────────────────────────────────────────────────
  const openPayment = (inv) => {
    setActive(inv);
    const balance = Math.max(0, inv.totalAmount - inv.paidAmount);
    setPayForm({ amount: balance > 0 ? String(balance) : "", paymentMethod: "Bank_Transfer", transactionReference: "", paidDate: new Date().toISOString().split("T")[0] });
    setPaymentOpen(true);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!payForm.amount || Number(payForm.amount) <= 0) { toast.error("Enter a valid payment amount."); return; }
    try {
      setSubmitting(true);
      const res = await recordPayment(active._id, payForm);
      toast.success(res.message || "Payment recorded!");
      setPaymentOpen(false); setActive(null); fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to record payment.");
    } finally { setSubmitting(false); }
  };

  // ── Cancel ─────────────────────────────────────────────────────────
  const handleCancel = async (inv) => {
    try {
      await cancelInvoice(inv._id);
      toast.success(`Invoice ${inv.invoiceNumber} cancelled.`);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel.");
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────
  const openDelete = (inv) => { setActive(inv); setDeleteOpen(true); };
  const handleDelete = async () => {
    try {
      setSubmitting(true);
      await deleteInvoice(active._id);
      toast.success(`Invoice ${active.invoiceNumber} deleted.`);
      setDeleteOpen(false); setActive(null); fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete.");
    } finally { setSubmitting(false); }
  };

  // ── Detail ─────────────────────────────────────────────────────────
  const openDetail = (inv) => { setActive(inv); setDetailOpen(true); };

  // ══════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════

  return (
    <div className="space-y-6 pb-12">

      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Invoice Management</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold text-xs">FIN</span>
          </div>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Department: Finance (FIN) • Payables &amp; Receivables Tracker
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={fetchData} title="Refresh"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-purple-600 hover:bg-slate-50 transition shadow-2xs cursor-pointer">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer">
            <Plus size={16} /><span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* ── Stat Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<FileText size={22}/>} iconCls="bg-purple-50 text-purple-600"
          label="Total Invoiced" value={`₹ ${fmtINR(stats.totalAmount)}`} sub={`${stats.total} invoices`} />
        <StatCard icon={<CheckCircle2 size={22}/>} iconCls="bg-emerald-50 text-emerald-600"
          label="Total Collected" value={`₹ ${fmtINR(stats.paidAmount)}`} sub="fully paid" subCls="text-emerald-600" />
        <StatCard icon={<Clock size={22}/>} iconCls="bg-blue-50 text-blue-600"
          label="Outstanding" value={`₹ ${fmtINR(stats.outstanding)}`} sub="pending collection" subCls="text-blue-600" />
        <StatCard icon={<AlertTriangle size={22}/>} iconCls="bg-rose-50 text-rose-500"
          label="Overdue" value={`₹ ${fmtINR(stats.overdueAmount)}`} sub={`${stats.overdue} overdue`} subCls="text-rose-600" />
      </div>

      {/* ── Status Pipeline ───────────────────────────────────────── */}
      <StatusPipeline invoices={invoices} />

      {/* ── Main Table Card ───────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input type="text" placeholder="Search invoice #, client, department…"
              value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium outline-none focus:ring-2 focus:ring-purple-400 transition"/>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <FilterSelect value={filterStatus} onChange={setFilterStatus}
              icon={<Filter size={13}/>} options={[{ value: "all", label: "All Statuses" }, ...Object.keys(STATUS_CFG).map(s => ({ value: s, label: STATUS_CFG[s].label }))]} />
            <FilterSelect value={filterType} onChange={setFilterType}
              icon={<Package size={13}/>} options={[{ value: "all", label: "All Types" }, { value: "Payable", label: "Payable" }, { value: "Receivable", label: "Receivable" }]} />
            {monthOptions.length > 0 && (
              <FilterSelect value={filterMonth} onChange={setFilterMonth}
                icon={<Calendar size={13}/>}
                options={[{ value: "all", label: "All Months" }, ...monthOptions.map(m => {
                  const [yr, mo] = m.split("-");
                  return { value: m, label: new Date(`${yr}-${mo}-01`).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) };
                })]} />
            )}
          </div>
        </div>

        <p className="text-xs text-slate-400 font-medium">
          Showing <span className="font-bold text-slate-700">{filtered.length}</span> of{" "}
          <span className="font-bold text-slate-700">{invoices.length}</span> invoices
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 pr-3">Invoice #</th>
                <th className="py-3.5 px-3">Client / Vendor</th>
                <th className="py-3.5 px-3">Type</th>
                <th className="py-3.5 px-3">Total</th>
                <th className="py-3.5 px-3">Paid</th>
                <th className="py-3.5 px-3">Balance Due</th>
                <th className="py-3.5 px-3">Issue Date</th>
                <th className="py-3.5 px-3">Due Date</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 pl-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr><td colSpan="10" className="py-10 text-center text-slate-400">
                  <div className="flex items-center justify-center gap-2"><RefreshCw size={14} className="animate-spin"/>Loading invoices…</div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="10" className="py-14 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <FileText size={36} className="opacity-25"/>
                    <p className="font-medium">No invoices found.</p>
                    <p className="text-[11px]">Create your first invoice using the button above.</p>
                  </div>
                </td></tr>
              ) : filtered.map((inv) => {
                const sc = STATUS_CFG[inv.status] || STATUS_CFG.Issued;
                const tc = TYPE_CFG[inv.type]     || TYPE_CFG.Payable;
                const balance = Math.max(0, inv.totalAmount - inv.paidAmount);
                const od = isOverdue(inv);
                return (
                  <tr key={inv._id} className="hover:bg-slate-50/70 transition cursor-pointer" onClick={() => openDetail(inv)}>
                    <td className="py-3.5 pr-3">
                      <p className="font-bold text-purple-700">{inv.invoiceNumber}</p>
                      <p className="text-[11px] text-slate-400">{inv.department}</p>
                    </td>
                    <td className="py-3.5 px-3">
                      <p className="font-semibold text-slate-900 truncate max-w-[140px]">{inv.clientName}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{inv.clientEmail || "—"}</p>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${tc.cls}`}>{inv.type}</span>
                    </td>
                    <td className="py-3.5 px-3 font-bold font-mono text-slate-900 whitespace-nowrap">₹ {fmtINR(inv.totalAmount)}</td>
                    <td className="py-3.5 px-3 font-mono text-emerald-600 whitespace-nowrap">₹ {fmtINR(inv.paidAmount)}</td>
                    <td className={`py-3.5 px-3 font-bold font-mono whitespace-nowrap ${balance > 0 ? "text-rose-600" : "text-slate-400"}`}>
                      ₹ {fmtINR(balance)}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">{fmtDate(inv.issueDate)}</td>
                    <td className={`py-3.5 px-3 font-mono text-[11px] whitespace-nowrap ${od ? "text-rose-600 font-bold" : "text-slate-500"}`}>
                      {fmtDate(inv.dueDate)}{od && " ⚠"}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${sc.cls}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}/>
                        {sc.label}
                      </span>
                    </td>
                    <td className="py-3.5 pl-3 text-right whitespace-nowrap" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        {inv.status !== "Paid" && inv.status !== "Cancelled" && (
                          <button onClick={() => openPayment(inv)} title="Record Payment"
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition cursor-pointer">
                            <CreditCard size={14}/>
                          </button>
                        )}
                        <button onClick={() => openEdit(inv)} title="Edit"
                          className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition cursor-pointer">
                          <Edit3 size={14}/>
                        </button>
                        {inv.status !== "Paid" && inv.status !== "Cancelled" && (
                          <button onClick={() => handleCancel(inv)} title="Cancel Invoice"
                            className="p-1.5 text-orange-500 hover:bg-orange-50 rounded-lg transition cursor-pointer">
                            <Ban size={14}/>
                          </button>
                        )}
                        <button onClick={() => openDelete(inv)} title="Delete"
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer">
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MODAL — CREATE INVOICE
      ══════════════════════════════════════════════════════════════ */}
      {createOpen && (
        <InvoiceFormModal
          title="Create New Invoice"
          icon={<Plus size={18} className="text-purple-600"/>}
          form={form} setForm={setForm}
          budgets={budgets}
          submitting={submitting}
          onSubmit={handleCreate}
          onClose={() => { setCreateOpen(false); setForm(EMPTY_FORM()); }}
          submitLabel="Create Invoice"
          color="purple"
        />
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL — EDIT INVOICE
      ══════════════════════════════════════════════════════════════ */}
      {editOpen && active && (
        <InvoiceFormModal
          title={`Edit — ${active.invoiceNumber}`}
          icon={<Edit3 size={18} className="text-blue-600"/>}
          form={editForm} setForm={setEditForm}
          budgets={budgets}
          submitting={submitting}
          onSubmit={handleEdit}
          onClose={() => { setEditOpen(false); setActive(null); }}
          submitLabel="Save Changes"
          color="blue"
        />
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL — RECORD PAYMENT
      ══════════════════════════════════════════════════════════════ */}
      {paymentOpen && active && (
        <Modal onClose={() => setPaymentOpen(false)} title={`Record Payment — ${active.invoiceNumber}`}
          icon={<CreditCard size={18} className="text-emerald-600"/>} small>
          <form onSubmit={handlePayment} className="space-y-3.5">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between"><span>Invoice Total:</span><span className="font-bold font-mono">₹ {fmtINR(active.totalAmount)}</span></div>
              <div className="flex justify-between"><span>Already Paid:</span><span className="font-bold font-mono text-emerald-600">₹ {fmtINR(active.paidAmount)}</span></div>
              <div className="flex justify-between font-bold"><span>Balance Due:</span><span className="font-mono text-rose-600">₹ {fmtINR(Math.max(0, active.totalAmount - active.paidAmount))}</span></div>
            </div>

            <FormField label="Payment Amount (₹)">
              <input type="number" min="1" max={active.totalAmount - active.paidAmount}
                value={payForm.amount}
                onChange={(e) => setPayForm({ ...payForm, amount: e.target.value })}
                required className="form-inp font-mono font-bold"/>
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Payment Method">
                <select value={payForm.paymentMethod} onChange={(e) => setPayForm({ ...payForm, paymentMethod: e.target.value })} className="form-inp">
                  {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m.replace("_", " ")}</option>)}
                </select>
              </FormField>
              <FormField label="Payment Date">
                <input type="date" value={payForm.paidDate} onChange={(e) => setPayForm({ ...payForm, paidDate: e.target.value })} className="form-inp"/>
              </FormField>
            </div>
            <FormField label="Transaction Reference">
              <input type="text" placeholder="e.g. TXN#1234 / UTR No." value={payForm.transactionReference}
                onChange={(e) => setPayForm({ ...payForm, transactionReference: e.target.value })} className="form-inp"/>
            </FormField>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button type="button" onClick={() => setPaymentOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer">Cancel</button>
              <button type="submit" disabled={submitting}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50 transition">
                {submitting ? "Saving…" : "Record Payment"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL — INVOICE DETAIL
      ══════════════════════════════════════════════════════════════ */}
      {detailOpen && active && (
        <Modal onClose={() => setDetailOpen(false)} title={active.invoiceNumber}
          icon={<FileText size={18} className="text-purple-600"/>} wide>
          <InvoiceDetail invoice={active}
            onEdit={() => { setDetailOpen(false); openEdit(active); }}
            onPay={() => { setDetailOpen(false); openPayment(active); }}
          />
        </Modal>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL — CONFIRM DELETE
      ══════════════════════════════════════════════════════════════ */}
      {deleteOpen && active && (
        <Modal onClose={() => setDeleteOpen(false)} title="Delete Invoice"
          icon={<AlertTriangle size={18} className="text-rose-600"/>} small>
          <div className="space-y-4">
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-xs text-rose-700 font-medium">
              You are about to permanently delete invoice{" "}
              <span className="font-bold">{active.invoiceNumber}</span> (₹ {fmtINR(active.totalAmount)}) for{" "}
              <span className="font-bold">{active.clientName}</span>. This cannot be undone.
            </div>
            <div className="flex items-center justify-end gap-3">
              <button type="button" onClick={() => setDeleteOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer">Cancel</button>
              <button onClick={handleDelete} disabled={submitting}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50 transition">
                {submitting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════

/** Stat card */
const StatCard = ({ icon, iconCls, label, value, sub, subCls = "text-slate-400" }) => (
  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${iconCls}`}>{icon}</div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <h3 className="text-2xl font-bold font-mono text-slate-900 mt-1">{value}</h3>
      <p className={`text-[11px] font-semibold mt-1 ${subCls}`}>{sub}</p>
    </div>
  </div>
);

/** Status pipeline visualization */
const StatusPipeline = ({ invoices }) => {
  const counts = {};
  invoices.forEach(inv => { counts[inv.status] = (counts[inv.status] || 0) + 1; });
  const order = ["Draft","Issued","Partially_Paid","Paid","Overdue","Cancelled"];
  const total = invoices.length || 1;
  return (
    <div className="bg-white rounded-2xl px-6 py-4 border border-slate-100 shadow-sm">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Invoice Pipeline</p>
      <div className="flex gap-1 h-2 rounded-full overflow-hidden">
        {order.map(s => {
          const sc = STATUS_CFG[s];
          const pct = ((counts[s] || 0) / total) * 100;
          if (!pct) return null;
          const colorMap = { Draft:"bg-slate-300", Issued:"bg-blue-500", Partially_Paid:"bg-indigo-500", Paid:"bg-emerald-500", Overdue:"bg-rose-500", Cancelled:"bg-orange-400" };
          return <div key={s} style={{ width: `${pct}%` }} className={`${colorMap[s]} transition-all`} title={`${s}: ${counts[s]||0}`}/>;
        })}
      </div>
      <div className="flex flex-wrap gap-4 mt-3">
        {order.map(s => {
          if (!counts[s]) return null;
          const sc = STATUS_CFG[s];
          const dotMap = { Draft:"bg-slate-400", Issued:"bg-blue-500", Partially_Paid:"bg-indigo-500", Paid:"bg-emerald-500", Overdue:"bg-rose-500", Cancelled:"bg-orange-400" };
          return (
            <div key={s} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${dotMap[s]}`}/>
              <span className="text-[11px] font-semibold text-slate-600">{sc.label}: <span className="font-bold">{counts[s]}</span></span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Filter select */
const FilterSelect = ({ value, onChange, icon, options }) => (
  <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
    <span className="text-slate-400">{icon}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent outline-none cursor-pointer font-semibold text-xs">
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

/** Form field wrapper */
const FormField = ({ label, children }) => (
  <div>
    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">{label}</label>
    {children}
  </div>
);

/** Modal shell */
const Modal = ({ children, onClose, title, icon, small, wide }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    <div className={`bg-white rounded-3xl shadow-2xl w-full p-6 border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto ${wide ? "max-w-3xl" : small ? "max-w-md" : "max-w-2xl"}`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 sticky top-0 bg-white z-10">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">{icon}<span>{title}</span></h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer transition"><X size={18}/></button>
      </div>
      {children}
    </div>
  </div>
);

/** Invoice create/edit form modal */
const InvoiceFormModal = ({ title, icon, form, setForm, budgets, submitting, onSubmit, onClose, submitLabel, color }) => {
  const { subtotal, taxAmount, total } = computeTotals(form.lineItems, form.taxRate, form.discount);

  const updateLine = (i, field, val) => {
    const lines = [...form.lineItems];
    lines[i] = { ...lines[i], [field]: val };
    setForm({ ...form, lineItems: lines });
  };
  const addLine    = () => setForm({ ...form, lineItems: [...form.lineItems, EMPTY_LINE()] });
  const removeLine = (i) => setForm({ ...form, lineItems: form.lineItems.filter((_, idx) => idx !== i) });

  const colorMap = { purple: "bg-purple-600 hover:bg-purple-700", blue: "bg-blue-600 hover:bg-blue-700" };

  return (
    <Modal onClose={onClose} title={title} icon={icon} wide>
      <form onSubmit={onSubmit} className="space-y-5">

        {/* Client / Vendor Details */}
        <Section label="Client / Vendor Information">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Name *">
              <input type="text" placeholder="Vendor or client name" required value={form.clientName}
                onChange={e => setForm({ ...form, clientName: e.target.value })} className="form-inp"/>
            </FormField>
            <FormField label="Email">
              <input type="email" placeholder="email@example.com" value={form.clientEmail}
                onChange={e => setForm({ ...form, clientEmail: e.target.value })} className="form-inp"/>
            </FormField>
            <FormField label="Phone">
              <input type="text" placeholder="+91 98765 43210" value={form.clientPhone}
                onChange={e => setForm({ ...form, clientPhone: e.target.value })} className="form-inp"/>
            </FormField>
            <FormField label="GST / PAN">
              <input type="text" placeholder="22AAAAA0000A1Z5" value={form.clientGST}
                onChange={e => setForm({ ...form, clientGST: e.target.value })} className="form-inp"/>
            </FormField>
            <FormField label="Address">
              <input type="text" placeholder="City, State" value={form.clientAddress}
                onChange={e => setForm({ ...form, clientAddress: e.target.value })} className="form-inp"/>
            </FormField>
            <FormField label="Department">
              <input type="text" value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })} className="form-inp"/>
            </FormField>
          </div>
        </Section>

        {/* Dates & Type */}
        <Section label="Invoice Details">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <FormField label="Type">
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="form-inp">
                <option value="Payable">Payable</option>
                <option value="Receivable">Receivable</option>
              </select>
            </FormField>
            <FormField label="Status">
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="form-inp">
                {Object.keys(STATUS_CFG).map(s => <option key={s} value={s}>{STATUS_CFG[s].label}</option>)}
              </select>
            </FormField>
            <FormField label="Issue Date">
              <input type="date" value={form.issueDate} onChange={e => setForm({ ...form, issueDate: e.target.value })} className="form-inp"/>
            </FormField>
            <FormField label="Due Date *">
              <input type="date" required value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className="form-inp"/>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <FormField label="Payment Method">
              <select value={form.paymentMethod} onChange={e => setForm({ ...form, paymentMethod: e.target.value })} className="form-inp">
                {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m.replace("_", " ")}</option>)}
              </select>
            </FormField>
            <FormField label="Link Budget (optional)">
              <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className="form-inp">
                <option value="">— None —</option>
                {budgets.map(b => <option key={b._id} value={b._id}>{b.name} ({b.department?.code})</option>)}
              </select>
            </FormField>
          </div>
        </Section>

        {/* Line Items */}
        <Section label="Line Items">
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2 text-[10px] font-bold uppercase text-slate-400 px-1">
              <div className="col-span-5">Description</div>
              <div className="col-span-2 text-right">Qty</div>
              <div className="col-span-3 text-right">Unit Price (₹)</div>
              <div className="col-span-1 text-right">Amount</div>
              <div className="col-span-1"/>
            </div>
            {form.lineItems.map((line, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center">
                <input className="form-inp col-span-5" placeholder={`Item ${i+1} description`}
                  value={line.description} onChange={e => updateLine(i, "description", e.target.value)}/>
                <input className="form-inp col-span-2 text-right font-mono" type="number" min="1" placeholder="1"
                  value={line.quantity} onChange={e => updateLine(i, "quantity", e.target.value)}/>
                <input className="form-inp col-span-3 text-right font-mono" type="number" min="0" placeholder="0"
                  value={line.unitPrice} onChange={e => updateLine(i, "unitPrice", e.target.value)}/>
                <div className="col-span-1 text-right text-xs font-bold font-mono text-slate-700">
                  {fmtINR(computeLine(line))}
                </div>
                <button type="button" onClick={() => removeLine(i)} disabled={form.lineItems.length === 1}
                  className="col-span-1 p-1 text-slate-400 hover:text-rose-500 transition disabled:opacity-30 cursor-pointer">
                  <X size={14}/>
                </button>
              </div>
            ))}
            <button type="button" onClick={addLine}
              className="flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-800 mt-1 cursor-pointer">
              <Plus size={14}/> Add Line Item
            </button>
          </div>

          {/* Totals */}
          <div className="mt-4 border-t border-slate-100 pt-3 space-y-2">
            <div className="flex justify-end gap-6">
              <div className="space-y-1.5 text-xs w-64">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal:</span><span className="font-mono font-bold text-slate-700">₹ {fmtINR(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>GST / Tax (<input type="number" min="0" max="100"
                    value={form.taxRate} onChange={e => setForm({ ...form, taxRate: e.target.value })}
                    className="w-10 inline text-center border border-slate-200 rounded px-1 mx-1 font-mono text-[11px]"/>%):</span>
                  <span className="font-mono font-bold text-slate-700">₹ {fmtINR(taxAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Discount (₹):</span>
                  <input type="number" min="0" value={form.discount}
                    onChange={e => setForm({ ...form, discount: e.target.value })}
                    className="w-24 text-right border border-slate-200 rounded px-2 py-0.5 font-mono text-xs"/>
                </div>
                <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1.5">
                  <span>Total:</span><span className="font-mono text-purple-700">₹ {fmtINR(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Notes */}
        <Section label="Notes">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Client Notes">
              <textarea rows="2" placeholder="Notes visible to client…" value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })} className="form-inp resize-none"/>
            </FormField>
            <FormField label="Internal Notes">
              <textarea rows="2" placeholder="Internal only…" value={form.internalNotes}
                onChange={e => setForm({ ...form, internalNotes: e.target.value })} className="form-inp resize-none"/>
            </FormField>
          </div>
        </Section>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer">Cancel</button>
          <button type="submit" disabled={submitting}
            className={`px-6 py-2.5 ${colorMap[color]} text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50 transition`}>
            {submitting ? "Saving…" : submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
};

/** Section header + content wrapper */
const Section = ({ label, children }) => (
  <div>
    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-100 pb-1">{label}</p>
    {children}
  </div>
);

/** Invoice detail view inside a modal */
const InvoiceDetail = ({ invoice, onEdit, onPay }) => {
  const sc = STATUS_CFG[invoice.status] || STATUS_CFG.Issued;
  const tc = TYPE_CFG[invoice.type]     || TYPE_CFG.Payable;
  const balance = Math.max(0, invoice.totalAmount - invoice.paidAmount);

  return (
    <div className="space-y-5">
      {/* Header Row */}
      <div className="flex flex-wrap items-center gap-3">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs border ${sc.cls}`}>
          <span className={`w-2 h-2 rounded-full ${sc.dot}`}/>{sc.label}
        </span>
        <span className={`px-2.5 py-1 rounded-md font-bold text-xs border ${tc.cls}`}>{invoice.type}</span>
        {invoice.budget?.name && (
          <span className="px-2.5 py-1 rounded-md font-bold text-xs bg-slate-50 text-slate-600 border border-slate-200">
            Budget: {invoice.budget.name}
          </span>
        )}
      </div>

      {/* Client + Dates */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <DRow label="Client / Vendor"   value={invoice.clientName} />
        <DRow label="Email"             value={invoice.clientEmail} />
        <DRow label="Phone"             value={invoice.clientPhone} />
        <DRow label="GST / PAN"         value={invoice.clientGST} />
        <DRow label="Address"           value={invoice.clientAddress} />
        <DRow label="Department"        value={invoice.department} />
        <DRow label="Issue Date"        value={fmtDate(invoice.issueDate)} />
        <DRow label="Due Date"          value={fmtDate(invoice.dueDate)} />
        <DRow label="Payment Method"    value={invoice.paymentMethod?.replace("_"," ")} />
        {invoice.transactionReference && <DRow label="Txn Reference" value={invoice.transactionReference} />}
        {invoice.paidDate && <DRow label="Paid Date" value={fmtDate(invoice.paidDate)} />}
        <DRow label="Created By"        value={invoice.createdBy?.fullName} />
      </div>

      {/* Line Items */}
      {invoice.lineItems?.length > 0 && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Line Items</p>
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-400">
                <tr>
                  <th className="py-2 px-3 text-left">Description</th>
                  <th className="py-2 px-3 text-right">Qty</th>
                  <th className="py-2 px-3 text-right">Unit Price</th>
                  <th className="py-2 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.lineItems.map((l, i) => (
                  <tr key={i}>
                    <td className="py-2 px-3 text-slate-700">{l.description}</td>
                    <td className="py-2 px-3 text-right font-mono">{l.quantity}</td>
                    <td className="py-2 px-3 text-right font-mono">₹ {fmtINR(l.unitPrice)}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold">₹ {fmtINR(l.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mt-3">
            <div className="space-y-1.5 text-xs w-64">
              <div className="flex justify-between text-slate-500"><span>Subtotal:</span><span className="font-mono font-bold">₹ {fmtINR(invoice.subtotal)}</span></div>
              <div className="flex justify-between text-slate-500"><span>GST ({invoice.taxRate}%):</span><span className="font-mono font-bold">₹ {fmtINR(invoice.taxAmount)}</span></div>
              {invoice.discount > 0 && <div className="flex justify-between text-slate-500"><span>Discount:</span><span className="font-mono font-bold text-rose-500">-₹ {fmtINR(invoice.discount)}</span></div>}
              <div className="flex justify-between font-bold text-slate-900 border-t pt-1.5"><span>Total:</span><span className="font-mono">₹ {fmtINR(invoice.totalAmount)}</span></div>
              <div className="flex justify-between text-emerald-600 font-bold"><span>Paid:</span><span className="font-mono">₹ {fmtINR(invoice.paidAmount)}</span></div>
              {balance > 0 && <div className="flex justify-between text-rose-600 font-bold"><span>Balance Due:</span><span className="font-mono">₹ {fmtINR(balance)}</span></div>}
            </div>
          </div>
        </div>
      )}

      {invoice.notes && (
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
          <p className="text-[11px] font-bold uppercase text-slate-400 mb-1">Notes</p>
          <p className="text-xs text-slate-700">{invoice.notes}</p>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-1">
        {invoice.status !== "Paid" && invoice.status !== "Cancelled" && (
          <button onClick={onPay}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-emerald-700 transition">
            <CreditCard size={13}/> Record Payment
          </button>
        )}
        <button onClick={onEdit}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-blue-700 transition">
          <Edit3 size={13}/> Edit Invoice
        </button>
      </div>
    </div>
  );
};

const DRow = ({ label, value }) => (
  <div>
    <p className="text-[11px] font-bold uppercase text-slate-400 mb-0.5">{label}</p>
    <p className="text-xs font-semibold text-slate-800">{value || "—"}</p>
  </div>
);

// ── Inject scoped CSS ──────────────────────────────────────────────────────────
if (!document.head.querySelector("[data-inv-styles]")) {
  const s = document.createElement("style");
  s.setAttribute("data-inv-styles","true");
  s.textContent = `.form-inp{width:100%;padding:.6rem .875rem;background:rgb(248 250 252);border:1px solid rgb(226 232 240);border-radius:.75rem;font-size:.75rem;font-weight:500;outline:none;transition:box-shadow .15s;}.form-inp:focus{box-shadow:0 0 0 2px rgb(147 51 234/.35);}`;
  document.head.appendChild(s);
}

export default InvoicesPage;
