const AttendanceSummary = ({ attendenceStats = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {attendenceStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {stat.value}
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  {stat.subtitle}
                </p>
              </div>

              <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center">
                {Icon && <Icon size={21} className="text-blue-600" />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceSummary;
