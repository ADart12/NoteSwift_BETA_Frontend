const EmployeeMonthlyAttendance = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Monthly Attendance
        </h2>

        <select className="text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none">
          <option>August 2026</option>
        </select>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs">

        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (day) => (
            <div
              key={day}
              className="text-gray-400 font-medium"
            >
              {day}
            </div>
          )
        )}

        {Array.from({ length: 31 }, (_, index) => {
          const day = index + 1;

          return (
            <div
              key={day}
              className="h-7 flex items-center justify-center"
            >
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  [4, 5, 6, 7, 10, 11, 12].includes(day)
                    ? "bg-green-100 text-green-700"
                    : day === 13
                    ? "bg-red-100 text-red-600"
                    : day === 14
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-600"
                }`}
              >
                {day}
              </span>
            </div>
          );
        })}

      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-xs text-gray-500">

        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Present
        </div>

        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Absent
        </div>

        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          Leave
        </div>

        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-400" />
          Today
        </div>

      </div>
    </div>
  );
};

export default EmployeeMonthlyAttendance;