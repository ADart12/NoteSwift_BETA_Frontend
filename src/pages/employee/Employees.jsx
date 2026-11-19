import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Pagination from "../../components/common/Pagination";
import EmployeeFilters from "../../components/employeesCompo/EmployeeFilters";
import EmployeeTable from "../../components/employeesCompo/EmployeeTable";
import EmployeeCard from "../../components/employeesCompo/EmployeeCard";
import { getEmployees } from "../../services/employeeServies";
import { LayoutGrid, List } from "lucide-react";

const Employee = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getEmployees({
        search: debouncedSearch,
        department,
        status,
        page: currentPage,
        limit: 10,
      });

      setEmployees(data.employees || []);
      setTotalEmployees(data.totalEmployees || 0);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, department, status, currentPage]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div className="min-h-screen bg-slate-100 p-6 space-y-6">
      <Header
        title="Employee Management"
        subtitle={`Manage staff and employee records (${totalEmployees} total)`}
        titleClassName="text-5xl font-extrabold tracking-tight text-white"
        subtitleClassName="mt-2 text-lg text-blue-100/90 font-normal"
        rightContent={
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/invite-employee")}
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition shadow-sm"
            >
              + Add Employee
            </button>
          </div>
        }
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex-1">
          <EmployeeFilters
            search={search}
            setSearch={setSearch}
            department={department}
            setDepartment={setDepartment}
            status={status}
            setStatus={setStatus}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 self-end">
          <button
            onClick={() => setViewMode("table")}
            className={`p-2.5 rounded-lg transition ${
              viewMode === "table"
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            title="Table View"
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2.5 rounded-lg transition ${
              viewMode === "grid"
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            title="Grid View"
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
          Loading employees...
        </div>
      ) : employees.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-500">
          No employees found matching the filters.
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <EmployeeCard key={employee._id} employee={employee} />
          ))}
        </div>
      ) : (
        <EmployeeTable employees={employees} />
      )}

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Employee;
