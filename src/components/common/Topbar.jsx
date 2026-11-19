import {
  Search,
  CalendarDays,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isFinanceManager =
    user?.email === "tekraj@noteswift.com" ||
    user?.email === "finance.manager@noteswift.com" ||
    user?.role === "finance_manager" ||
    ((user?.role === "manager" || user?.role === "c_level") &&
      (user?.department?.name?.toLowerCase() === "finance" ||
        user?.department?.code?.toUpperCase() === "FIN" ||
        user?.designation?.toLowerCase().includes("finance")));

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mr-3"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Search */}
        <div className="relative w-full max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder={
              isFinanceManager
                ? "Search employees, expenses, budgets..."
                : "Search system..."
            }
            className="w-full bg-gray-100 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Calendar link to attendance */}
          <button
            onClick={() => navigate(user?.role === "employee" ? "/my-attendance" : "/attendance")}
            title="Attendance"
            className="text-gray-500 hover:text-blue-600 transition"
          >
            <CalendarDays size={22} />
          </button>

          {/* Notification */}
          <button
            className="relative text-gray-500 hover:text-blue-600 transition"
            title="Notifications"
          >
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
              1
            </span>
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200" />

          {/* Profile Button */}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 hover:opacity-85 transition text-left cursor-pointer"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.fullName || "User"
              )}&background=2563eb&color=fff`}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover shadow-xs"
            />

            <div className="hidden md:block">
              <h4 className="font-semibold text-gray-800 text-sm">
                {user?.fullName || "User"}
              </h4>

              <p className="text-xs text-gray-500 capitalize">
                {isFinanceManager ? "Finance Manager" : (user?.designation || user?.role || "Staff")}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
