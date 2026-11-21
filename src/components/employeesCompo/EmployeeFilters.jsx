import { useEffect, useState } from "react";
import { getDepartments } from "../../services/invitationServices";

const EmployeeFilters = ({
  search,
  setSearch,
  role,
  setRole,
  department,
  setDepartment,
  lockedDeptId,
  lockedDeptLabel,
  status,
  setStatus,
  setCurrentPage,
}) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDept = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data.departments || []);
      } catch (err) {
        console.error("Failed to fetch departments for filter:", err);
      }
    };
    fetchDept();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by ID, Name or Email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={role || ""}
          onChange={(e) => {
            if (setRole) setRole(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="ceo">CEO / Executive</option>
          <option value="c_level">C-Level Officer</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff / Lead</option>
          <option value="employee">Employee</option>
        </select>

        {/* Department: locked badge or free dropdown */}
        {lockedDeptId ? (
          <div className="w-full border border-blue-200 rounded-lg px-4 py-3 bg-blue-50 flex items-center gap-2 text-blue-700 font-medium text-sm select-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>{lockedDeptLabel} (Locked)</span>
          </div>
        ) : (

          <select
            value={department || ""}
            onChange={(e) => {
              if (setDepartment) setDepartment(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name} ({dept.code})
              </option>
            ))}
          </select>
        )}

        <select
          value={status || ""}
          onChange={(e) => {
            if (setStatus) setStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-center sm:justify-end mt-4">
        <button
          onClick={() => {
            setSearch("");
            if (setRole) setRole("");
            // Don't clear locked department
            if (!lockedDeptId && setDepartment) setDepartment("");
            if (setStatus) setStatus("");
            setCurrentPage(1);
          }}
          className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition text-sm"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default EmployeeFilters;
