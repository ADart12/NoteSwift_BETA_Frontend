import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Building2,
  Briefcase,
  ShieldCheck,
  Key,
  Copy,
  Check,
  RefreshCw,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { getDepartments, sendInvitation } from "../../services/invitationServices";
import { createEmployee, getDesignations } from "../../services/employeeServies";
import toast from "react-hot-toast";

const InviteEmployee = () => {
  const navigate = useNavigate();

  // Mode: "direct" (Instant creation with credentials) or "invite" (Email invitation link)
  const [mode, setMode] = useState("direct");

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [customDesignation, setCustomDesignation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    departmentId: "",
    designation: "",
    role: "employee",
    password: "NoteSwift@123",
    joiningDate: new Date().toISOString().split("T")[0],
    dateOfBirth: "",
    address: "",
    city: "",
    country: "Nepal",
  });

  // Fetch departments
  const fetchDepartmentsData = useCallback(async () => {
    try {
      const data = await getDepartments();
      const list = data?.departments || [];
      setDepartments(list);
      if (list.length > 0) {
        setFormData((prev) => ({
          ...prev,
          departmentId: prev.departmentId || list[0]._id,
        }));
      }
    } catch (err) {
      console.error("Failed to load departments:", err);
      toast.error("Could not load departments.");
    }
  }, []);

  // Fetch designations when department changes
  const fetchDesignationsData = useCallback(async (deptId) => {
    if (!deptId) return;
    try {
      const data = await getDesignations(deptId);
      const list = data?.designations || [];
      setDesignations(list);

      // Default to first designation if available and not custom
      if (list.length > 0) {
        setFormData((prev) => ({
          ...prev,
          designation: list[0].title,
        }));
        setCustomDesignation(false);
      } else {
        setCustomDesignation(true);
      }
    } catch (err) {
      console.warn("Could not load department designations:", err);
      setDesignations([]);
      setCustomDesignation(true);
    }
  }, []);

  useEffect(() => {
    fetchDepartmentsData();
  }, [fetchDepartmentsData]);

  useEffect(() => {
    if (formData.departmentId) {
      fetchDesignationsData(formData.departmentId);
    }
  }, [formData.departmentId, fetchDesignationsData]);

  // Form input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Auto-generate strong password
  const generateRandomPassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    let pwd = "NS-";
    for (let i = 0; i < 8; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password: pwd }));
    toast.success("Generated new secure password!");
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Please fill in all required fields (Name, Email, Phone).");
      return;
    }

    if (!formData.departmentId) {
      toast.error("Please select an organization department.");
      return;
    }

    if (!formData.designation.trim()) {
      toast.error("Please provide a job designation.");
      return;
    }

    try {
      setLoading(true);

      if (mode === "direct") {
        // Direct Account Creation
        const res = await createEmployee({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          departmentId: formData.departmentId,
          designation: formData.designation,
          role: formData.role,
          password: formData.password,
          joiningDate: formData.joiningDate,
          dateOfBirth: formData.dateOfBirth,
          address: formData.address,
          city: formData.city,
          country: formData.country,
        });

        toast.success(res.message || "Employee created successfully!");
        setSuccessData({
          type: "direct",
          employeeId: res.credentials?.employeeId || res.employee?.employeeId,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          department:
            departments.find((d) => d._id === formData.departmentId)?.name || "Department",
          designation: formData.designation,
        });
      } else {
        // Send Invitation Link
        const res = await sendInvitation({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          departmentId: formData.departmentId,
          designation: formData.designation,
          role: formData.role,
        });

        toast.success(res.message || "Invitation created successfully!");
        setSuccessData({
          type: "invite",
          employeeId: res.employeeId || "--",
          fullName: formData.fullName,
          email: formData.email,
          invitationLink: res.invitationLink,
          role: formData.role,
          department:
            departments.find((d) => d._id === formData.departmentId)?.name || "Department",
          designation: formData.designation,
          emailSent: res.emailSent,
        });
      }
    } catch (err) {
      console.error("Employee registration error:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to process employee onboarding.");
    } finally {
      setLoading(false);
    }
  };

  // Copy credentials to clipboard
  const handleCopyCredentials = () => {
    if (!successData) return;

    const textToCopy =
      successData.type === "direct"
        ? `NoteSwift Employee Login Credentials:
------------------------------------
Employee ID: ${successData.employeeId}
Name: ${successData.fullName}
Department: ${successData.department}
Designation: ${successData.designation}
Role: ${successData.role}
Email: ${successData.email}
Password: ${successData.password}
Portal URL: ${window.location.origin}/login
------------------------------------
Please log in and update your password upon first sign-in.`
        : `NoteSwift Employee Invitation Link:
------------------------------------
Hello ${successData.fullName},
You have been invited to join NoteSwift as ${successData.designation} in ${successData.department}.
Complete your registration here:
${successData.invitationLink}
------------------------------------`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Credentials copied to clipboard!");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleReset = () => {
    setSuccessData(null);
    setFormData((prev) => ({
      ...prev,
      fullName: "",
      email: "",
      phone: "",
      designation: designations[0]?.title || "",
      password: "NoteSwift@123",
      address: "",
      city: "",
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-200 mb-2">
            <Building2 size={16} />
            <span>Enterprise Staff & Sector Onboarding</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Add New Employee
          </h1>
          <p className="text-sm md:text-base text-blue-100/90 mt-1 max-w-xl">
            Register personnel across all corporate sectors (Academics, Technology, Finance, HR, Operations, Sales, Marketing).
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="bg-white/15 backdrop-blur-md p-1.5 rounded-2xl flex items-center border border-white/20 self-start md:self-center shrink-0">
          <button
            type="button"
            onClick={() => setMode("direct")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              mode === "direct"
                ? "bg-white text-blue-800 shadow-md"
                : "text-white/80 hover:text-white"
            }`}
          >
            <Sparkles size={15} />
            <span>Direct Account (Instant)</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("invite")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              mode === "invite"
                ? "bg-white text-blue-800 shadow-md"
                : "text-white/80 hover:text-white"
            }`}
          >
            <Mail size={15} />
            <span>Invite via Email</span>
          </button>
        </div>
      </div>

      {/* SUCCESS MODAL / CARD */}
      {successData ? (
        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
              <Check size={28} className="stroke-[3]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {successData.type === "direct" ? "Account Created Successfully" : "Invitation Generated"}
              </span>
              <h2 className="text-2xl font-bold text-slate-800 mt-1">
                {successData.fullName} is now registered!
              </h2>
              <p className="text-xs text-slate-500">
                Employee ID: <strong className="font-mono text-slate-800">{successData.employeeId}</strong> • Department: <strong>{successData.department}</strong>
              </p>
            </div>
          </div>

          {/* Credentials Display Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Key size={14} className="text-blue-600" />
                {successData.type === "direct" ? "Login Credentials" : "Invitation Access Link"}
              </span>
              <button
                type="button"
                onClick={handleCopyCredentials}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition border border-blue-200 cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy Details"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Email Address</span>
                <span className="text-slate-800 font-bold text-sm select-all">{successData.email}</span>
              </div>

              {successData.type === "direct" ? (
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Temporary Password</span>
                  <span className="text-emerald-700 font-bold text-sm select-all">{successData.password}</span>
                </div>
              ) : (
                <div className="bg-white p-3 rounded-xl border border-slate-200 md:col-span-2">
                  <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Invitation URL</span>
                  <span className="text-blue-600 font-bold text-xs select-all break-all">{successData.invitationLink}</span>
                </div>
              )}

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Designation & Role</span>
                <span className="text-slate-700 font-medium capitalize font-sans">{successData.designation} ({successData.role})</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Department Sector</span>
                <span className="text-slate-700 font-medium font-sans">{successData.department}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition cursor-pointer"
            >
              + Add Another Employee
            </button>

            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Employee Directory</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* REGISTRATION FORM */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Personal Information Section */}
          <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <UserPlus size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">Personal Information</h3>
                <p className="text-xs text-slate-400">Basic identification and contact credentials</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe / Tek Raj Bhatt"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Corporate Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition font-mono"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+977 98XXXXXXXX"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition font-mono"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Date of Birth (Optional)
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Street Address (Optional)
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. Putalisadak, Ward 28"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  City (Optional)
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Kathmandu"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* 2. Enterprise Sector & Organizational Assignment */}
          <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Briefcase size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">Enterprise Sector & Role Placement</h3>
                <p className="text-xs text-slate-400">Department sector, designation title, and hierarchy permissions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Department */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Department Sector <span className="text-red-500">*</span>
                </label>
                <select
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="" disabled>Select Department Sector</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name} ({dept.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Designation */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Designation Title <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setCustomDesignation(!customDesignation)}
                    className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    {customDesignation ? "Choose from standard list" : "Type custom title"}
                  </button>
                </div>

                {customDesignation || designations.length === 0 ? (
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g. Senior Full Stack Engineer"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                ) : (
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
                  >
                    {designations.map((desig) => (
                      <option key={desig._id} value={desig.title}>
                        {desig.title} [{desig.hierarchyLevel || "STAFF"}]
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Role & Hierarchy Permission */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  System Role & Authority <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="employee">Employee / Individual Contributor (Standard Access)</option>
                  <option value="staff">Staff / Team Lead (Senior Contributor)</option>
                  <option value="manager">Manager / Department Head (Sector Leadership & Attendance Monitoring)</option>
                  <option value="c_level">C-Level Officer (CFO, CTO, CHRO, CAO, COO, CCO)</option>
                  <option value="admin">System Administrator (Full Management Access)</option>
                  <option value="super_admin">Super Administrator (Root Enterprise Access)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Managers and Administrators can view department attendance and monitor photos/GPS.
                </p>
              </div>

              {/* Date of Joining */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Date of Joining
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* 3. Credentials & Security (Direct Add Mode Only) */}
          {mode === "direct" && (
            <div className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">Account Credentials & Password</h3>
                    <p className="text-xs text-slate-400">Set initial access key or auto-generate a secure password</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={generateRandomPassword}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-bold border border-amber-200 transition cursor-pointer"
                >
                  <RefreshCw size={13} />
                  <span>Auto-Generate Password</span>
                </button>
              </div>

              <div className="max-w-md">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Initial Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter or generate temporary password"
                    className="w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  You will be able to copy these credentials upon saving to share with the employee.
                </p>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="px-6 py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl transition shadow-lg hover:shadow-xl hover:scale-[1.02] duration-200 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : mode === "direct" ? (
                <>
                  <UserPlus size={18} />
                  <span>Create Employee Account</span>
                </>
              ) : (
                <>
                  <Mail size={18} />
                  <span>Generate & Send Invitation</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default InviteEmployee;
