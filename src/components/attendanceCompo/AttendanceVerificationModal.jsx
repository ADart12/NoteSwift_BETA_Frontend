import { X, MapPin, ExternalLink, Camera, Clock, ShieldCheck, AlertCircle } from "lucide-react";

const AttendanceVerificationModal = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  const departmentName =
    typeof employee?.department === "object"
      ? employee?.department?.name
      : employee?.department || "--";

  const hasCheckInLocation =
    employee?.checkInLocation?.latitude != null &&
    employee?.checkInLocation?.longitude != null;

  const hasCheckOutLocation =
    employee?.checkOutLocation?.latitude != null &&
    employee?.checkOutLocation?.longitude != null;

  const checkInMapsUrl = hasCheckInLocation
    ? `https://www.google.com/maps?q=${employee.checkInLocation.latitude},${employee.checkInLocation.longitude}`
    : null;

  const checkOutMapsUrl = hasCheckOutLocation
    ? `https://www.google.com/maps?q=${employee.checkOutLocation.latitude},${employee.checkOutLocation.longitude}`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
          <div className="flex items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                employee?.fullName || "User"
              )}&background=ffffff&color=2563eb&bold=true`}
              alt={employee?.fullName}
              className="w-13 h-13 rounded-2xl shadow-md border-2 border-white/30"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{employee?.fullName}</h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    employee?.status === "Present"
                      ? "bg-emerald-400/20 text-emerald-200 border border-emerald-400/30"
                      : employee?.status === "Late"
                      ? "bg-amber-400/20 text-amber-200 border border-amber-400/30"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {employee?.status || "Absent"}
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-0.5">
                {employee?.email} • {departmentName} • ID: {employee?.employeeId || "--"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <ShieldCheck size={16} className="text-blue-600" />
            <span>Biometric Photo & GPS Geo-Tag Verification Audit</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Check-In Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Check-In Verification
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Clock size={12} />
                    {employee?.checkIn || "Not Checked In"}
                  </span>
                </div>

                {/* Photo Snapshot */}
                <div className="mt-4">
                  {employee?.checkInPhoto ? (
                    <div className="relative group rounded-xl overflow-hidden border-2 border-emerald-500/30 bg-black shadow-inner">
                      <img
                        src={employee.checkInPhoto}
                        alt="Check-in Snapshot"
                        className="w-full h-52 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-emerald-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                        <Camera size={11} />
                        Webcam Captured
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-52 bg-slate-200/70 rounded-xl flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-300">
                      <Camera size={36} className="text-slate-300 mb-2" />
                      <span className="text-xs font-medium">No webcam photo recorded</span>
                    </div>
                  )}
                </div>

                {/* Geo-tag Location */}
                <div className="mt-4 bg-white rounded-xl p-3.5 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <MapPin size={14} className="text-emerald-600" />
                    <span>GPS Geo-Tag Coordinates</span>
                  </div>

                  {hasCheckInLocation ? (
                    <div className="space-y-1 text-xs text-slate-600 font-mono">
                      <p>Latitude: <strong className="text-slate-900">{employee.checkInLocation.latitude}</strong></p>
                      <p>Longitude: <strong className="text-slate-900">{employee.checkInLocation.longitude}</strong></p>
                      {employee.checkInLocation.accuracy && (
                        <p className="text-[11px] text-slate-400">
                          Accuracy: ±{Math.round(employee.checkInLocation.accuracy)}m
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No GPS coordinates logged</p>
                  )}
                </div>
              </div>

              {hasCheckInLocation && (
                <a
                  href={checkInMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <ExternalLink size={14} />
                  <span>Verify on Google Maps</span>
                </a>
              )}
            </div>

            {/* Check-Out Card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    Check-Out Verification
                  </span>
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Clock size={12} />
                    {employee?.checkOut || (employee?.checkIn ? "In Progress" : "--")}
                  </span>
                </div>

                {/* Photo Snapshot */}
                <div className="mt-4">
                  {employee?.checkOutPhoto ? (
                    <div className="relative group rounded-xl overflow-hidden border-2 border-blue-500/30 bg-black shadow-inner">
                      <img
                        src={employee.checkOutPhoto}
                        alt="Check-out Snapshot"
                        className="w-full h-52 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                        <Camera size={11} />
                        Webcam Captured
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-52 bg-slate-200/70 rounded-xl flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-300">
                      {employee?.checkIn && !employee?.checkOut ? (
                        <>
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2 animate-pulse">
                            <Clock size={18} className="text-blue-600" />
                          </div>
                          <span className="text-xs font-medium text-slate-600">
                            Employee is actively working
                          </span>
                          <span className="text-[11px] text-slate-400 mt-1">
                            Snapshot will capture upon check-out
                          </span>
                        </>
                      ) : (
                        <>
                          <Camera size={36} className="text-slate-300 mb-2" />
                          <span className="text-xs font-medium">No check-out photo recorded</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Geo-tag Location */}
                <div className="mt-4 bg-white rounded-xl p-3.5 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <MapPin size={14} className="text-blue-600" />
                    <span>GPS Geo-Tag Coordinates</span>
                  </div>

                  {hasCheckOutLocation ? (
                    <div className="space-y-1 text-xs text-slate-600 font-mono">
                      <p>Latitude: <strong className="text-slate-900">{employee.checkOutLocation.latitude}</strong></p>
                      <p>Longitude: <strong className="text-slate-900">{employee.checkOutLocation.longitude}</strong></p>
                      {employee.checkOutLocation.accuracy && (
                        <p className="text-[11px] text-slate-400">
                          Accuracy: ±{Math.round(employee.checkOutLocation.accuracy)}m
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      {employee?.checkIn && !employee?.checkOut
                        ? "Coordinates will be captured on checkout"
                        : "No GPS coordinates logged"}
                    </p>
                  )}
                </div>
              </div>

              {hasCheckOutLocation && (
                <a
                  href={checkOutMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  <ExternalLink size={14} />
                  <span>Verify on Google Maps</span>
                </a>
              )}
            </div>
          </div>

          {/* Shift Stats Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block">Working Hours</span>
                <span className="text-lg font-bold font-mono text-slate-800">
                  {employee?.workingHours != null ? `${employee.workingHours} hrs` : "0 hrs"}
                </span>
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400 block">Overtime</span>
                <span className="text-lg font-bold font-mono text-indigo-600">
                  {employee?.overtime != null ? `${employee.overtime} hrs` : "0 hrs"}
                </span>
              </div>
              {employee?.isLate && (
                <div>
                  <span className="text-[11px] uppercase font-bold text-amber-500 block">Late Arrival</span>
                  <span className="text-lg font-bold font-mono text-amber-600 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {employee?.lateMinutes || 0} mins
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold transition"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceVerificationModal;
