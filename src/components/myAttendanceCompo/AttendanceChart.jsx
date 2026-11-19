import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const AttendanceChart = ({ summary }) => {
  const percentage = Number(summary?.attendancePercentage ?? 0);

  const data = [
    {
      name: "Present",
      value: percentage,
    },
    {
      name: "Absent",
      value: Math.max(0, 100 - percentage),
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          Attendance Overview
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Your monthly attendance percentage
        </p>
      </div>

      {/* Donut Chart */}
      <div className="w-full h-[280px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={105}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              <Cell fill="#2563eb" />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-gray-800">
            {percentage}%
          </span>

          <span className="text-sm text-gray-500 mt-1">
            Total Attendance
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-6 mt-1">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          Present ({percentage}%)
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200"></span>
          Absent ({Math.max(0, 100 - percentage)}%)
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
