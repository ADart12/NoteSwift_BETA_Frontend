import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeServies";
import { useNavigate } from "react-router-dom";

const RecentEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setLoading(true);
        const data = await getEmployees({ limit: 4 });
        setEmployees(data?.employees || []);
      } catch (err) {
        console.error("Failed to load recent employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Recent Employees</h2>
          <p className="text-sm text-gray-500">Newly added team members</p>
        </div>

        <button
          onClick={() => navigate("/employees")}
          className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition"
        >
          View All →
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 py-6 text-center">Loading team members...</p>
      ) : employees.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">No employees found.</p>
      ) : (
        employees.map((emp) => {
          const departmentName =
            typeof emp.department === "object"
              ? emp.department?.name
              : emp.department || "General";

          const joinedDate = emp.joiningDate
            ? new Date(emp.joiningDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "Recently";

          return (
            <div
              key={emp._id}
              className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-xs hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-lg font-bold shadow-xs shrink-0">
                {emp.fullName?.charAt(0) || "?"}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 truncate">
                  {emp.fullName}
                </h3>

                <p className="text-xs text-gray-500 mt-0.5 truncate">
                  <span className="font-mono text-gray-700">{emp.employeeId}</span>
                  <span className="mx-1.5">•</span>
                  <span>{emp.designation || "Staff"}</span>
                </p>

                <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                    {departmentName}
                  </span>
                  <span>•</span>
                  <span>Joined {joinedDate}</span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RecentEmployees;
