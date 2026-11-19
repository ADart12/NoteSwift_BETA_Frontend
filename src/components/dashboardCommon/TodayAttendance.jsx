import { useEffect, useState } from "react";
import { getTodayAttendance } from "../../services/attendenceServices";
import { useNavigate } from "react-router-dom";

const TodayAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const data = await getTodayAttendance();
        setAttendance(data?.attendance || []);
      } catch (err) {
        console.error("Failed to load today's attendance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Today's Attendance</h2>
          <p className="text-sm text-gray-500">Live records for today</p>
        </div>

        <button
          onClick={() => navigate("/attendance")}
          className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition"
        >
          View All →
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-sm text-gray-400 py-6 text-center">Loading attendance...</p>
        ) : attendance.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">No attendance checked in yet today.</p>
        ) : (
          attendance.slice(0, 5).map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    item.status === "Present"
                      ? "bg-green-500"
                      : item.status === "Late"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {item.employee?.fullName || "Employee"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Check In: {item.checkIn || "--"} | Out: {item.checkOut || "--"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.checkInPhoto && (
                  <img
                    src={item.checkInPhoto}
                    alt="Snapshot"
                    title="Webcam Snapshot"
                    className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-2xs"
                  />
                )}
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    item.status === "Present"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : item.status === "Late"
                      ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodayAttendance;
