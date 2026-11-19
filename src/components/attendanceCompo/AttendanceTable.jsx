import { useState } from "react";
import AttendanceRow from "./AttendanceRow";
import AttendanceVerificationModal from "./AttendanceVerificationModal";

const AttendanceTable = ({ employees = [], loading }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  if (loading) {
    return (
      <div className="relative bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center overflow-x-auto">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-500 font-medium">Loading attendance records...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                Employee
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                Department
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                Check In
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                Check Out
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                Hours
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider">
                Verification & GPS
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {employees.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-12 text-gray-500">
                  <div className="max-w-sm mx-auto">
                    <p className="font-semibold text-slate-700">No attendance records found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Employees can self-check in using their laptop camera and geo-location.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <AttendanceRow
                  key={employee._id}
                  employee={employee}
                  onViewVerification={(emp) => setSelectedEmployee(emp)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Verification modal for webcam photo & GPS location */}
      <AttendanceVerificationModal
        isOpen={!!selectedEmployee}
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </>
  );
};

export default AttendanceTable;
