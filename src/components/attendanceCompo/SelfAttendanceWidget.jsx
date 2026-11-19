import { useState, useEffect, useCallback } from "react";
import { Camera, CheckCircle2, Clock, MapPin, LogIn, LogOut } from "lucide-react";
import { getMyAttendance } from "../../services/attendenceServices";
import SelfAttendanceModal from "./SelfAttendanceModal";

const SelfAttendanceWidget = ({ onAttendanceUpdated }) => {
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState("checkIn");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("");

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMyAttendance();
      setAttendance(data?.attendance || null);
    } catch (err) {
      console.error("Failed to load personal attendance status:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Live timer for currently checked-in employees
  useEffect(() => {
    if (!attendance?.checkIn || attendance?.checkOut) return;

    const calculateElapsed = () => {
      const now = new Date();
      // Parse checkIn time (e.g. "09:05 AM")
      const match = String(attendance.checkIn).match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (match) {
        let h = parseInt(match[1], 10);
        const m = parseInt(match[2], 10);
        const ampm = match[3].toUpperCase();
        if (ampm === "PM" && h < 12) h += 12;
        if (ampm === "AM" && h === 12) h = 0;

        const checkInDate = new Date();
        checkInDate.setHours(h, m, 0, 0);

        const diffMs = Math.max(0, now.getTime() - checkInDate.getTime());
        const totalMinutes = Math.floor(diffMs / 60000);
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        setElapsedTime(`${hours}h ${mins}m`);
      }
    };

    calculateElapsed();
    const interval = setInterval(calculateElapsed, 30000);
    return () => clearInterval(interval);
  }, [attendance]);

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleSuccess = (updatedRecord) => {
    setAttendance(updatedRecord);
    if (onAttendanceUpdated) {
      onAttendanceUpdated(updatedRecord);
    }
    fetchStatus();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center text-gray-400">
        Loading attendance status...
      </div>
    );
  }

  const isCheckedIn = !!attendance?.checkIn;
  const isCheckedOut = !!attendance?.checkOut;

  return (
    <>
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          {/* Status Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-200">
              <Clock size={16} />
              <span>Today&apos;s Attendance Status</span>
            </div>

            {!isCheckedIn ? (
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  You Have Not Checked In Today
                </h3>
                <p className="text-sm text-blue-100/80 mt-1">
                  Please capture your laptop webcam photo and geo-tag to start your working hours.
                </p>
              </div>
            ) : !isCheckedOut ? (
              <div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    Currently Checked In ({attendance.checkIn})
                  </h3>
                </div>
                <p className="text-sm text-blue-100/90 mt-1 flex items-center gap-3 flex-wrap">
                  <span>⏱️ Shift Time: <strong className="font-mono text-white">{elapsedTime || "Calculating..."}</strong></span>
                  {attendance.checkInLocation?.latitude && (
                    <span className="flex items-center gap-1 font-mono text-xs bg-white/10 px-2.5 py-0.5 rounded-full">
                      <MapPin size={12} />
                      {attendance.checkInLocation.latitude}, {attendance.checkInLocation.longitude}
                    </span>
                  )}
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-400" size={24} />
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    Today&apos;s Attendance Completed
                  </h3>
                </div>
                <p className="text-sm text-blue-100/80 mt-1">
                  Check-in: <strong className="text-white">{attendance.checkIn}</strong> • Check-out: <strong className="text-white">{attendance.checkOut}</strong> • Total: <strong className="text-white">{attendance.workingHours} hrs</strong>
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons & Photo Snapshot */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Display snapshot preview if available */}
            {attendance?.checkInPhoto && (
              <div className="hidden sm:block text-center">
                <img
                  src={attendance.checkInPhoto}
                  alt="Today's Check-in"
                  className="w-14 h-14 rounded-xl object-cover border-2 border-white/30 shadow-md"
                  title="Check-in Photo Snapshot"
                />
                <span className="text-[10px] text-blue-200 block mt-1">Snapshot</span>
              </div>
            )}

            {!isCheckedIn ? (
              <button
                type="button"
                onClick={() => handleOpenModal("checkIn")}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-sm transition shadow-lg hover:scale-105 duration-200 cursor-pointer"
              >
                <Camera size={18} />
                <LogIn size={18} />
                <span>Self Check In Now</span>
              </button>
            ) : !isCheckedOut ? (
              <button
                type="button"
                onClick={() => handleOpenModal("checkOut")}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm transition shadow-lg hover:scale-105 duration-200 cursor-pointer"
              >
                <LogOut size={18} />
                <span>Self Check Out Now</span>
              </button>
            ) : (
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl text-center border border-white/20">
                <span className="text-xs text-blue-200 block">Total Shift</span>
                <span className="text-lg font-bold font-mono text-white">
                  {attendance.workingHours} Hours
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <SelfAttendanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default SelfAttendanceWidget;
