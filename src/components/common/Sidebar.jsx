import { useState } from "react";
import { LogOut, X, AlertTriangle, Camera, Coins } from "lucide-react";
import { getMenu } from "../../Data/menu";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/authService";
import { getMyAttendance } from "../../services/attendenceServices";
import SelfAttendanceModal from "../attendanceCompo/SelfAttendanceModal";
import toast from "react-hot-toast";

const Sidebar = ({ closeSidebar }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [showCheckOutPrompt, setShowCheckOutPrompt] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [currentAttendance, setCurrentAttendance] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isFinanceManager =
    user?.email === "tekraj@noteswift.com" ||
    user?.email === "finance.manager@noteswift.com" ||
    user?.role === "finance_manager" ||
    ((user?.role === "manager" || user?.role === "c_level") &&
      (user?.department?.name?.toLowerCase() === "finance" ||
        user?.department?.code?.toUpperCase() === "FIN" ||
        user?.designation?.toLowerCase().includes("finance")));

  const menuItems = getMenu(user);

  const performLogout = async () => {
    try {
      setIsLoggingOut(true);
      const data = await logout();
      setUser(null);
      toast.success(data.message || "Logged out successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogoutClick = async () => {
    // If user is employee, manager, or staff, check if they are currently checked in without checking out
    if (user?.role === "employee" || user?.role === "manager" || user?.role === "staff") {
      try {
        const res = await getMyAttendance();
        const att = res?.attendance;
        if (att?.checkIn && !att?.checkOut) {
          setCurrentAttendance(att);
          setShowCheckOutPrompt(true);
          return;
        }
      } catch (err) {
        console.warn("Could not check current attendance status before logout:", err);
      }
    }

    await performLogout();
  };

  const handleSelfCheckOutSuccess = async () => {
    setIsAttendanceModalOpen(false);
    toast.success("Attendance checked out successfully! Logging out...");
    await performLogout();
  };

  return (
    <>
      <div className="h-full bg-white border-r flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xl shadow-xs">
              N
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Noteswift
              </h2>
              <p className="text-xs text-gray-500">
                Integrated Management System
              </p>
            </div>
          </div>

          <button
            onClick={closeSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sector Card for Finance Manager (matches Image 3) */}
        {isFinanceManager && (
          <div className="mx-4 mt-4 p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Coins size={20} />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-sm leading-tight truncate">
                Finance Manager
              </h4>
              <p className="text-xs font-semibold text-blue-600 mt-0.5 truncate">
                FIN • Finance Department
              </p>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom User Info */}
        <div className="border-t p-4 shrink-0 bg-gray-50/50">
          <div
            onClick={() => {
              navigate("/profile");
              closeSidebar();
            }}
            className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-white transition"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.fullName || "User"
              )}&background=2563eb&color=fff`}
              alt="User"
              className="w-10 h-10 rounded-full shadow-xs"
            />

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {user?.fullName || "Employee"}
              </h3>
              <p className="text-xs text-gray-500 capitalize truncate">
                {isFinanceManager ? "Finance Manager" : (user?.designation || user?.role || "Staff")}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogoutClick}
            disabled={isLoggingOut}
            className="flex items-center justify-center gap-2 text-red-600 w-full mt-3 py-2 text-sm font-medium hover:bg-red-50 rounded-xl transition cursor-pointer"
          >
            <LogOut size={16} />
            <span>{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
          </button>
        </div>
      </div>

      {/* Check-Out Confirmation Modal upon Logout */}
      {showCheckOutPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 text-center space-y-4 border border-slate-100">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle size={28} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800">
                You Are Currently Checked In!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                You checked in at <strong className="text-slate-700">{currentAttendance?.checkIn}</strong>.
                Would you like to capture your webcam photo and geo-tag to check out before signing out?
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowCheckOutPrompt(false);
                  setIsAttendanceModalOpen(true);
                }}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                <Camera size={16} />
                <span>Check Out With Photo & Sign Out</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCheckOutPrompt(false);
                  performLogout();
                }}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                Sign Out Without Checking Out
              </button>

              <button
                type="button"
                onClick={() => setShowCheckOutPrompt(false)}
                className="w-full py-2 text-slate-400 hover:text-slate-600 text-xs font-medium transition cursor-pointer"
              >
                Cancel & Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Self-attendance Modal triggered during logout */}
      <SelfAttendanceModal
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
        mode="checkOut"
        onSuccess={handleSelfCheckOutSuccess}
      />
    </>
  );
};

export default Sidebar;
