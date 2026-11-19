const LeaveRow = ({ item, ApproveTheLeave, rejectLeave }) => {
  const statusStyle = {
    Approved: "bg-green-100 text-green-700 border border-green-200",
    Pending: "bg-amber-100 text-amber-800 border border-amber-200",
    Rejected: "bg-red-100 text-red-700 border border-red-200",
  };

  const formatDate = (date) => {
    if (!date) return "--";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const departmentName =
    typeof item.employee?.department === "object"
      ? item.employee?.department?.name
      : item.employee?.department || "--";

  const fullName = item.employee?.fullName || "Employee";
  const email = item.employee?.email || "--";

  return (
    <tr className="border-b hover:bg-slate-50 transition">
      {/* Employee */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              fullName
            )}&background=2563EB&color=fff&bold=true`}
            alt={fullName}
            className="w-10 h-10 rounded-full shadow-2xs shrink-0"
          />

          <div>
            <h3 className="font-semibold text-slate-800 text-sm">{fullName}</h3>
            <p className="text-xs text-slate-500">{email}</p>
          </div>
        </div>
      </td>

      {/* Department */}
      <td className="px-6 py-4 text-sm text-slate-600 font-medium">
        {departmentName}
      </td>

      {/* Leave Type */}
      <td className="px-6 py-4 text-sm font-semibold text-slate-700">
        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-mono">
          {item.leaveType}
        </span>
      </td>

      {/* From */}
      <td className="px-6 py-4 text-sm text-slate-600 font-mono">
        {formatDate(item.fromDate)}
      </td>

      {/* To */}
      <td className="px-6 py-4 text-sm text-slate-600 font-mono">
        {formatDate(item.toDate)}
      </td>

      {/* Days */}
      <td className="px-6 py-4 text-sm text-slate-700 font-mono font-bold">
        {item.days} {item.days === 1 ? "day" : "days"}
      </td>

      {/* Status & Reason */}
      <td className="px-6 py-4">
        <div className="space-y-1">
          <span
            className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${
              statusStyle[item.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {item.status}
          </span>
          {item.reason && (
            <p className="text-xs text-slate-500 max-w-[200px] truncate" title={item.reason}>
              {item.reason}
            </p>
          )}
        </div>
      </td>

      {/* Action */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {item.status === "Pending" ? (
            <>
              <button
                type="button"
                onClick={() => ApproveTheLeave(item._id)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition shadow-2xs cursor-pointer"
              >
                Approve
              </button>

              <button
                type="button"
                onClick={() => rejectLeave(item._id)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition shadow-2xs cursor-pointer"
              >
                Reject
              </button>
            </>
          ) : (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                item.status === "Approved"
                  ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                  : "text-red-700 bg-red-50 border border-red-200"
              }`}
            >
              {item.status}
            </span>
          )}
        </div>
      </td>
    </tr>
  );
};

export default LeaveRow;
