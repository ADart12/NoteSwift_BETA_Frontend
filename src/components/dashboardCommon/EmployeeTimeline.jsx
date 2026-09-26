const EmployeeTimeline = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Today's Timeline
        </h2>
      </div>

      <div className="space-y-5">

        {/* Check In */}
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5" />

          <div className="flex-1">
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-800">
                Check In
              </p>

              <span className="text-xs px-2 py-1 rounded-md bg-green-100 text-green-600">
                Present
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-1">
              09:05 AM
            </p>
          </div>
        </div>

        {/* Working */}
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5" />

          <div className="flex-1">
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-800">
                Working
              </p>

              <span className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-600">
                8h 15m
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-1">
              Currently working
            </p>
          </div>
        </div>

        {/* Check Out */}
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-gray-300 mt-1.5" />

          <div className="flex-1">
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-800">
                Check Out
              </p>

              <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-500">
                Pending
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-1">
              —
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployeeTimeline;