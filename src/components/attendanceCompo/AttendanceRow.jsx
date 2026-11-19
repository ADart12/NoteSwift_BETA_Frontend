import { MapPin, ShieldCheck } from "lucide-react";

const AttendanceRow = ({ employee, onViewVerification }) => {
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

  return (
    <tr className="border-b hover:bg-slate-50/80 transition">
      {/* Employee */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              employee?.fullName || "User"
            )}&background=2563eb&color=fff`}
            alt={employee?.fullName}
            className="w-10 h-10 rounded-full object-cover shadow-xs shrink-0"
          />

          <div>
            <h3 className="font-semibold text-slate-800 text-sm">
              {employee?.fullName}
            </h3>
            <p className="text-xs text-slate-500">{employee?.email}</p>
          </div>
        </div>
      </td>

      {/* Department */}
      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{departmentName}</td>

      {/* Attendance Status */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
            employee?.status === "Present"
              ? "bg-green-100 text-green-700"
              : employee?.status === "Absent"
              ? "bg-red-100 text-red-700"
              : employee?.status === "Late"
              ? "bg-yellow-100 text-yellow-800"
              : employee?.status === "Half Day"
              ? "bg-orange-100 text-orange-700"
              : employee?.status === "Leave"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {employee?.status || "Absent"}
        </span>
      </td>

      {/* Check In */}
      <td className="px-6 py-4">
        {employee?.checkIn ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-slate-800">
              {employee.checkIn}
            </span>
            {employee.checkInPhoto && (
              <button
                type="button"
                onClick={() => onViewVerification && onViewVerification(employee)}
                className="relative group p-1 bg-emerald-50 rounded-lg border border-emerald-200 hover:border-emerald-400 transition cursor-pointer"
                title="Click to view Check-In Webcam Photo"
              >
                <img
                  src={employee.checkInPhoto}
                  alt="Snapshot"
                  className="w-7 h-7 rounded object-cover"
                />
              </button>
            )}
            {hasCheckInLocation && (
              <a
                href={`https://www.google.com/maps?q=${employee.checkInLocation.latitude},${employee.checkInLocation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`GPS: ${employee.checkInLocation.latitude}, ${employee.checkInLocation.longitude}`}
                className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
              >
                <MapPin size={15} />
              </a>
            )}
          </div>
        ) : (
          <span className="text-slate-400 font-mono text-sm">--</span>
        )}
      </td>

      {/* Check Out */}
      <td className="px-6 py-4">
        {employee?.checkOut ? (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-slate-800">
              {employee.checkOut}
            </span>
            {employee.checkOutPhoto && (
              <button
                type="button"
                onClick={() => onViewVerification && onViewVerification(employee)}
                className="relative group p-1 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-400 transition cursor-pointer"
                title="Click to view Check-Out Webcam Photo"
              >
                <img
                  src={employee.checkOutPhoto}
                  alt="Snapshot"
                  className="w-7 h-7 rounded object-cover"
                />
              </button>
            )}
            {hasCheckOutLocation && (
              <a
                href={`https://www.google.com/maps?q=${employee.checkOutLocation.latitude},${employee.checkOutLocation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`GPS: ${employee.checkOutLocation.latitude}, ${employee.checkOutLocation.longitude}`}
                className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
              >
                <MapPin size={15} />
              </a>
            )}
          </div>
        ) : employee?.checkIn ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Working
          </span>
        ) : (
          <span className="text-slate-400 font-mono text-sm">--</span>
        )}
      </td>

      {/* Working Hours */}
      <td className="px-6 py-4 font-mono text-sm text-slate-700">
        {employee?.workingHours ? (
          <span className="font-semibold">
            {employee.workingHours} hrs
            {employee.overtime > 0 && (
              <span className="text-xs text-indigo-600 ml-1">
                (+{employee.overtime} OT)
              </span>
            )}
          </span>
        ) : (
          <span className="text-slate-400">--</span>
        )}
      </td>

      {/* Verification & Geo-Tag Inspection */}
      <td className="px-6 py-4">
        {employee?.checkInPhoto || employee?.checkIn ? (
          <button
            type="button"
            onClick={() => onViewVerification && onViewVerification(employee)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-semibold text-xs border border-blue-200 transition shadow-2xs cursor-pointer"
          >
            <ShieldCheck size={14} />
            <span>Audit Photo & GPS</span>
          </button>
        ) : (
          <span className="text-xs text-slate-400 italic">No activity</span>
        )}
      </td>
    </tr>
  );
};

export default AttendanceRow;
