import { Eye, Pencil, Trash2 } from "lucide-react";

const EmployeeRow = ({ emp }) => {
  const departmentName =
    typeof emp?.department === "object"
      ? emp?.department?.name
      : emp?.department || "--";

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-6 py-4 font-mono text-sm text-gray-700">
        {emp?.employeeId}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {emp?.fullName?.charAt(0) || "?"}
          </div>
          <span className="font-medium text-gray-900">{emp?.fullName}</span>
        </div>
      </td>

      <td className="px-6 py-4 text-gray-600">{emp?.email}</td>
      <td className="px-6 py-4">
        <span className="capitalize px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
          {emp?.role}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600">{departmentName}</td>
      <td className="px-6 py-4 text-gray-600">{emp?.designation || "--"}</td>

      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
            title="View Details"
          >
            <Eye size={18} />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
            title="Edit Employee"
          >
            <Pencil size={18} />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
            title="Delete Employee"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeRow;
