import { Eye, Pencil, Trash2 } from "lucide-react";

const EmployeeCard = ({ employee }) => {
  const departmentName =
    typeof employee?.department === "object"
      ? employee?.department?.name
      : employee?.department || "--";

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
          {employee?.fullName?.charAt(0) || "?"}
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{employee?.fullName}</h3>
          <p className="text-sm text-gray-500 truncate">{employee?.email}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 border-t pt-3">
        <p><strong className="text-gray-800">ID:</strong> {employee?.employeeId}</p>
        <p><strong className="text-gray-800">Role:</strong> <span className="capitalize">{employee?.role}</span></p>
        <p><strong className="text-gray-800">Department:</strong> {departmentName}</p>
        <p><strong className="text-gray-800">Designation:</strong> {employee?.designation || "--"}</p>
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
        <button
          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
          title="View Details"
        >
          <Eye size={18} />
        </button>

        <button
          className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition"
          title="Edit Employee"
        >
          <Pencil size={18} />
        </button>

        <button
          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
          title="Delete Employee"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
