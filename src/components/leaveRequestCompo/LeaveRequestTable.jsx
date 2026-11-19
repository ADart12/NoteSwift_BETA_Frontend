import LeaveRequestRow from "./LeaveRequestRow";

const LeaveRequestTable = ({ leaveRequests = [] }) => {
  const requests = Array.isArray(leaveRequests) ? leaveRequests : [];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          My Leave Requests
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          View all your submitted leave requests
        </p>
      </div>

      {/* ================= TABLE ================= */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[750px]">
          {/* ================= TABLE HEADER ================= */}
          <thead>
            <tr className="bg-indigo-50/60 text-left">
              <th className="px-6 py-4 text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Leave Type
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                From
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                To
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Days
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Reason
              </th>

              <th className="px-6 py-4 text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>

          {/* ================= TABLE BODY ================= */}
          <tbody className="divide-y divide-gray-100">
            {requests.map((request) => (
              <LeaveRequestRow
                key={request._id}
                request={request}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {requests.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-indigo-50 flex items-center justify-center mb-3">
            <span className="text-xl">📋</span>
          </div>

          <p className="text-sm font-medium text-gray-700">
            No leave requests found
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Your submitted leave requests will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestTable;
