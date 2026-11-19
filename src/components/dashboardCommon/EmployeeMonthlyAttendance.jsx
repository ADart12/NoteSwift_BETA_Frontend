import { useState } from "react";

const EmployeeMonthlyAttendance = () => {
  const [currentDate] = useState(new Date());

  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const todayDate = currentDate.getDate();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Monthly Attendance
        </h2>

        <div className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 rounded-lg px-3 py-1.5">
          {monthName} {year}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-gray-400 font-medium py-1">
            {day}
          </div>
        ))}

        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const isToday = day === todayDate;

          return (
            <div
              key={day}
              className="h-8 flex items-center justify-center"
            >
              <span
                className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition ${
                  isToday
                    ? "bg-blue-600 text-white font-bold shadow-xs"
                    : day < todayDate
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-5 text-xs text-gray-500 border-t pt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          Present
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          Today
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
          Leave
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          Absent
        </div>
      </div>
    </div>
  );
};

export default EmployeeMonthlyAttendance;
