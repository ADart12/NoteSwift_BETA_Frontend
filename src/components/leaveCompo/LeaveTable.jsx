import LeaveRow from "./LeaveRow";

const LeaveTable = ({ leaves = [], ApproveTheLeave, rejectLeave, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-gray-500 font-medium">Loading leave requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Employee</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Department</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Leave Type</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">From</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">To</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Days</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Status & Reason</th>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {leaves.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-12 text-gray-500">
                <p className="font-semibold text-slate-700">No leave requests found</p>
                <p className="text-xs text-slate-400 mt-1">Try changing status or filter criteria</p>
              </td>
            </tr>
          ) : (
            leaves.map((item) => (
              <LeaveRow
                key={item._id}
                item={item}
                ApproveTheLeave={ApproveTheLeave}
                rejectLeave={rejectLeave}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;
